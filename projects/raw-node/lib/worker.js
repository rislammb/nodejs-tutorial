/*
 * Title: Workers library
 * Description: Server related functions
 * Author: Rayhanul Islam
 * Date: 05 Sep 2022
 */

// dpendencies
const url = require('url');
const http = require('http');
const https = require('https');
const data = require('./data');
const { parseJSON } = require('../helpers/utilities');
const { sendTwilioSms } = require('../helpers/notifications');

// workers object - module scaffolding
const worker = {};

// send notification sms to user is state change
worker.alertUserToStatusChange = (checkData) => {
    const { method, protocol, url: checkUrl, state, phone } = checkData;
    const message = `Alert: Your check for ${method.toUpperCase()} ${protocol}://${checkUrl} is currently ${state}`;

    sendTwilioSms(phone, message, (err) => {
        if (err) {
            console.log('There was a problem sending sms to one of the user!');
        } else {
            console.log(`User was alerted to a status change via SMS: ${message}`);
        }
    });
};

// save chack outcome to database and send to next process
worker.processCheckOutcome = (chkData, checkOutcome) => {
    const checkData = chkData;
    // check if check outcome is up or down
    const state =
        !checkOutcome.error &&
        checkOutcome.responseCode &&
        checkData.successCode.indexOf(checkOutcome.responseCode) > -1
            ? 'up'
            : 'down';

    // decide whether we should alert the user or not
    const alertWanted = !!(checkData.lastChecked && checkData.state !== state);

    // update the check data
    checkData.state = state;
    checkData.lastChecked = Date.now();

    // update the check perform result to database
    data.update('checks', checkData.id, checkData, (err) => {
        if (!err) {
            // send the check data to next process
            if (alertWanted) {
                // send the check data to send notification
                worker.alertUserToStatusChange(checkData);
            } else {
                console.log('Alert: is not needed as there is no state change!');
            }
        } else {
            console.log('Error trying to save check data of one of the check!');
        }
    });
};

// perform check
worker.performCheck = (checkData) => {
    // prepare the initial check outcome
    const checkOutcome = {
        error: false,
        responseCode: false,
    };
    // mark the outcome has not been sent yet
    let isOutcomeSent = false;

    // parse the hostname and full url from check data
    const { hostname, path } = url.parse(`${checkData.protocol}://${checkData.url}`, true);

    // construct the request
    const requestDetails = {
        protocol: `${checkData.protocol}:`,
        hostname,
        method: checkData.method.toUpperCase(),
        path,
        timeout: checkData.timeoutSeconds * 1000,
    };

    const protocolToUse = checkData.protocol === 'http' ? http : https;
    const req = protocolToUse.request(requestDetails, (res) => {
        // update the check outcome and pass to the next process
        checkOutcome.responseCode = res.statusCode;
        if (!isOutcomeSent) {
            worker.processCheckOutcome(checkData, checkOutcome);
            isOutcomeSent = true;
        }
    });

    req.on('error', (err) => {
        checkOutcome.error = true;
        checkOutcome.value = err;

        if (!isOutcomeSent) {
            worker.processCheckOutcome(checkData, checkOutcome);
            isOutcomeSent = true;
        }
    });

    req.on('timeout', () => {
        checkOutcome.error = true;
        checkOutcome.value = 'timeout';

        if (!isOutcomeSent) {
            worker.processCheckOutcome(checkData, checkOutcome);
            isOutcomeSent = true;
        }
    });

    // send request
    req.end();
};

// validate individual check data
worker.validateCheckData = (chkData) => {
    const checkData = chkData;
    if (checkData && checkData.id) {
        checkData.state =
            typeof checkData.state === 'string' && ['up', 'down'].indexOf(checkData.state) > -1
                ? checkData.state
                : 'down';

        checkData.lastChecked =
            typeof checkData.lastChecked === 'number' && checkData.lastChecked > 0
                ? checkData.lastChecked
                : false;

        // pass to the next process
        worker.performCheck(checkData);
    } else {
        console.log('Error: check was invalid or not properly formatted!');
    }
};

// lookup all the checks
worker.gatherAllCkecks = () => {
    // get all the checks
    data.readAll('checks', (err1, checksData) => {
        if (err1 || !checksData) {
            console.log('Error: reading all checks faild!');
        } else if (checksData.length > 0) {
            checksData.forEach((check) => {
                // read the check data
                data.read('checks', check, (err2, checkData) => {
                    if (err2 || !checkData) {
                        console.log('Error: reading one of the check data!');
                    } else {
                        // pass the data to the check validator
                        worker.validateCheckData(parseJSON(checkData));
                    }
                });
            });
        } else {
            console.log('Error: Could not find any checks to process!');
        }
    });
};

// timer to execute the worker process once per minute
worker.loop = () => {
    setInterval(() => {
        worker.gatherAllCkecks();
    }, 1000 * 60);
};

// start the worker
worker.init = () => {
    // execute all the checks
    worker.gatherAllCkecks();

    // call the loop so that checks continue
    worker.loop();
};

// export module
module.exports = worker;
