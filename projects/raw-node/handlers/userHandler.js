/* eslint-disable no-underscore-dangle */
/*
 * Title: Handle User route
 * Description: Handle User route
 * Author: Rayhanul Islam
 * Date: 25 Aug 2022
 */

// dependendies
const { hash, parseJSON } = require('../helpers/utilities');
const data = require('../lib/data');

// module scaffolding
const handler = {};

// health route handler
handler.userHandler = (requestProperties, callback) => {
    const acceptedMethod = ['get', 'post', 'put', 'delete'];

    if (acceptedMethod.indexOf(requestProperties.method) < 0) {
        callback(405);
    } else {
        handler._users[requestProperties.method](requestProperties, callback);
    }
};

handler._users = {};

handler._users.post = (requestProperties, callback) => {
    const { body } = requestProperties;
    const fristName =
        typeof body.fristName === 'string' && body.fristName.trim().length > 0
            ? body.fristName.trim()
            : false;
    const lastName =
        typeof body.lastName === 'string' && body.lastName.trim().length > 0
            ? body.lastName.trim()
            : false;
    const phone =
        typeof body.phone === 'string' && body.phone.trim().length > 10 ? body.phone.trim() : false;
    const password =
        typeof body.password === 'string' && body.password.trim().length > 0
            ? body.password.trim()
            : false;
    const tosAgreement =
        typeof body.tosAgreement === 'boolean' && body.tosAgreement ? body.tosAgreement : false;

    if (fristName && lastName && phone && tosAgreement) {
        // make sure that the user doesn't already exists
        data.read('users', phone, (err, user) => {
            if (err && !user) {
                const userObj = {
                    fristName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };

                data.create('users', phone, userObj, (err2) => {
                    if (err2) {
                        callback(500, { error: 'Could not create user!' });
                    } else {
                        callback(201, { message: 'User was created successfully.' });
                    }
                });
            } else if (user) {
                callback(500, { error: 'User already exists!' });
            } else {
                callback(500, { error: 'There was a problem in server side!' });
            }
        });
    } else {
        callback(400, { error: 'You have a problem in your request!' });
    }
};

handler._users.get = (requestProperties, callback) => {
    callback(200, { m: 'user get' });
};

handler._users.put = (requestProperties, callback) => {
    callback(200, { m: 'user put' });
};

handler._users.delete = (requestProperties, callback) => {
    callback(200, { m: 'user delete' });
};

// export module
module.exports = handler;
