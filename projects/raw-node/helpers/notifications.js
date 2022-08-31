/*
 * Title: Notifications Library
 * Description: Important functions to notify users
 * Author: Rayhanul Islam
 * Date: 31 Aug 2022
 */

// dependencies
const https = require('https');
const querystring = require('querystring');
const { twilio } = require('./environments');

// module scaffolding
const notifications = {};

// send sms to user using twilio api
notifications.sendTwilioSms = (phone, msg, callback) => {
    // input validation
    const userPhone =
        typeof phone === 'string' && phone.trim().length === 11 ? phone.trim() : false;
    const message =
        typeof msg === 'string' && msg.trim().length() > 0 && msg.trim().length() <= 1600
            ? msg.trim()
            : false;

    if (userPhone && message) {
        // configure the request payload
        const payload = {
            From: twilio.fromPhone,
            To: `+88${userPhone}`,
            Body: message,
        };

        // stringify the payload
        const payloadString = querystring.stringify(payload);

        // configure the request details
        const requestDetails = {
            hostname: 'api.twilio.com',
            method: 'POST',
            path: '',
            auth: '',
            headers: {
                'Content-Type': 'application/x-www-from-urlencoded',
            },
        };

        // instantiate the request object
        https.request(requestDetails, (res) => {
            console.log(res.statusCode);
        });
    } else {
        callback('Given parameters were missing or invalid!');
    }
};
