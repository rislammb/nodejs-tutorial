/*
 * Title: Utitlities
 * Description: Important utility functions
 * Author: Rayhanul Islam
 * Date: 27 Aug 2022
 */

// dependencies
const crypto = require('crypto');
const environments = require('./environments');

// module scaffolding
const utilities = {};

// parse json string to object
utilities.parseJSON = (jsonString) => {
    let output;
    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }
    return output;
};

// hash string
utilities.hash = (string) => {
    if (typeof string === 'string' && string.length > 0) {
        return crypto.createHmac('sha256', environments.secretKey).update(string).digest('hex');
    }
    return false;
};

// create random string
utilities.createRandomString = (strLength) => {
    const length = typeof strLength === 'number' && strLength > 0 ? strLength : false;

    if (length) {
        const characters = 'abcdefghijklmnopqrstuvwxyz1234567890';
        let output = '';
        for (let i = 0; i < length; i += 1) {
            output += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return output;
    }
    return false;
};

// export module
module.exports = utilities;
