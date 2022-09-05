/*
 * Title: Workers library
 * Description: Server related functions
 * Author: Rayhanul Islam
 * Date: 05 Sep 2022
 */

// dpendencies
const data = require('./data');

// workers object - module scaffolding
const worker = {};

// lookup all the checks
worker.gatherAllCkecks = () => {
    data.readAll('checks', (err, checkData) => {
        if (err || !checkData) {
            console.log('Error: Could not find any checks to process!');
        } else {
            console.log(checkData);
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
    console.log('Worker started');
    // execute all the checks
    worker.gatherAllCkecks();

    // call the loop so that checks continue
    worker.loop();
};

// export module
module.exports = worker;
