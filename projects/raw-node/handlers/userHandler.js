/* eslint-disable no-underscore-dangle */
/*
 * Title: User Handler
 * Description: Handler for handle user related route
 * Author: Rayhanul Islam
 * Date: 25 Aug 2022
 */

// dependendies
const { hash, parseJSON } = require('../helpers/utilities');
const data = require('../lib/data');

// module scaffolding
const handler = {};

// user route handler
handler.userHandler = (requestProperties, callback) => {
    const acceptedMethod = ['get', 'post', 'put', 'delete'];

    if (acceptedMethod.indexOf(requestProperties.method) < 0) {
        callback(405);
    } else {
        handler._user[requestProperties.method](requestProperties, callback);
    }
};

handler._user = {};

handler._user.post = (requestProperties, callback) => {
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
        typeof body.password === 'string' && body.password.trim().length > 5
            ? body.password.trim()
            : false;
    const tosAgreement =
        typeof body.tosAgreement === 'boolean' && body.tosAgreement ? body.tosAgreement : false;

    if (fristName && lastName && phone && password && tosAgreement) {
        // make sure that the user doesn't already exists
        data.read('users', phone, (err, userData) => {
            if (err && !userData) {
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
            } else if (userData) {
                callback(500, { error: 'User already exists!' });
            } else {
                callback(500, { error: 'There was a problem in server side!' });
            }
        });
    } else {
        callback(400, { error: 'You have a problem in your request!' });
    }
};

handler._user.get = (requestProperties, callback) => {
    // check the phone number if valid
    const { query } = requestProperties;
    const phone =
        typeof query.phone === 'string' && query.phone.trim().length > 10
            ? query.phone.trim()
            : false;

    if (phone) {
        // lookup the user
        data.read('users', phone, (err, userData) => {
            if (err || !userData) {
                callback(404, { error: 'Requested user was not found!' });
            } else {
                const user = { ...parseJSON(userData) };

                delete user.password;
                callback(200, user);
            }
        });
    } else {
        callback(400, { error: 'You have a problem in your request!' });
    }
};

handler._user.put = (requestProperties, callback) => {
    const { body } = requestProperties;
    const phone =
        typeof body.phone === 'string' && body.phone.trim().length > 10 ? body.phone.trim() : false;

    const fristName =
        typeof body.fristName === 'string' && body.fristName.trim().length > 0
            ? body.fristName.trim()
            : false;
    const lastName =
        typeof body.lastName === 'string' && body.lastName.trim().length > 0
            ? body.lastName.trim()
            : false;
    const password =
        typeof body.password === 'string' && body.password.trim().length > 5
            ? body.password.trim()
            : false;
    if (phone) {
        if (fristName || lastName || password) {
            // lookup the user
            data.read('users', phone, (err, userData) => {
                const user = { ...parseJSON(userData) };

                if (err || !user) {
                    callback(404, { error: 'Requested user was not found!' });
                } else {
                    if (fristName) {
                        user.fristName = fristName;
                    }
                    if (lastName) {
                        user.lastName = lastName;
                    }
                    if (password) {
                        user.password = hash(password);
                    }

                    // updated user store to database
                    data.update('users', phone, user, (err2) => {
                        if (err2) {
                            callback(500, { error: 'There was a problem in the server side!' });
                        } else {
                            callback(200, { message: 'User was updated successfully.' });
                        }
                    });
                }
            });
        } else {
            callback(400, { error: 'You have a problem in your requset!' });
        }
    } else {
        callback(400, { error: 'Invalid phone number, Olease try again!' });
    }
};

handler._user.delete = (requestProperties, callback) => {
    // check the phone number if valid
    const { query } = requestProperties;
    const phone =
        typeof query.phone === 'string' && query.phone.trim().length > 10
            ? query.phone.trim()
            : false;

    if (phone) {
        // lookup the user
        data.read('users', phone, (err, userData) => {
            if (err || !userData) {
                callback(404, { error: 'Request user was not found!' });
            } else {
                data.delete('users', phone, (err2) => {
                    if (err2) {
                        callback(500, { error: 'There was a problem in the server side!' });
                    } else {
                        callback(200, { message: 'User was deleted successfully!' });
                    }
                });
            }
        });
    } else {
        callback(400, { error: 'There was a problem in your request!' });
    }
};

// export module
module.exports = handler;
