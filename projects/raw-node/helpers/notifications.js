/*
 * Title: Notifications Library
 * Description: Important functions to notify users
 * Author: Rayhanul Islam
 * Date: 31 Aug 2022
 */

// dependencies
const twilio = require('twilio');
const { twilioEnv } = require('./environments');

// module scaffolding
const notifications = {};

// send sms to user using twilio api
notifications.sendTwilioSms = (phone, msg, callback) => {
    // input validation
    const userPhone =
        typeof phone === 'string' && phone.trim().length === 11 ? phone.trim() : false;
    const message =
        typeof msg === 'string' && msg.trim().length > 0 && msg.trim().length <= 1600
            ? msg.trim()
            : false;

    if (userPhone && message) {
        // configure the request payload
        const payload = {
            from: twilioEnv.fromPhone,
            to: `+88${userPhone}`,
            body: message,
        };
        const client = twilio(twilioEnv.accountSid, twilioEnv.authToken);

        client.messages
            .create(payload)
            .then(() => callback(false))
            .catch((err) => callback(err));
    } else {
        callback('Given parameters were missing or invalid!');
    }
};

// export the module
module.exports = notifications;
