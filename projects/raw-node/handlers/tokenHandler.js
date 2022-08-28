/* eslint-disable no-underscore-dangle */
/*
 * Title: Token Handler
 * Description: Handler for handle token related route
 * Author: Rayhanul Islam
 * Date: 28 Aug 2022
 */

// dependendies
const { hash, parseJSON, createRandomString } = require('../helpers/utilities');
const data = require('../lib/data');

// module scaffolding
const handler = {};

// token route handler
handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMethod = ['get', 'post', 'put', 'delete'];

    if (acceptedMethod.indexOf(requestProperties.method) < 0) {
        callback(405);
    } else {
        handler._token[requestProperties.method](requestProperties, callback);
    }
};

handler._token = {};

handler._token.post = (requestProperties, callback) => {
    const { body } = requestProperties;
    const phone =
        typeof body.phone === 'string' && body.phone.trim().length > 10 ? body.phone.trim() : false;
    const password =
        typeof body.password === 'string' && body.password.trim().length > 5
            ? body.password.trim()
            : false;

    if (phone && password) {
        data.read('users', phone, (err1, userData) => {
            if (err1 || !userData) {
                callback(404, { error: 'Requested user was not found!' });
            } else {
                const hashedPassword = hash(password);
                if (hashedPassword === parseJSON(userData).password) {
                    const tokenId = createRandomString(20);
                    const expires = Date.now() + 1000 * 60 * 60;
                    const tokenObj = {
                        phone,
                        id: tokenId,
                        expires,
                    };

                    // store token in the database
                    data.create('tokens', tokenId, tokenObj, (err2) => {
                        if (err2) {
                            callback(500, { error: 'There was a problem in the server side!' });
                        } else {
                            callback(201, tokenObj);
                        }
                    });
                } else {
                    callback(400, { error: 'Password is not valid!' });
                }
            }
        });
    } else {
        callback(400, { error: 'You have a problem in your request!' });
    }
};

handler._token.get = (requestProperties, callback) => {
    // check the token id if valid
    const { query } = requestProperties;
    const id =
        typeof query.id === 'string' && query.id.trim().length === 20 ? query.id.trim() : false;

    if (id) {
        // lookup the token
        data.read('tokens', id, (err, tokenData) => {
            if (err || !tokenData) {
                callback(404, { error: 'Requested token was not found!' });
            } else {
                const token = { ...parseJSON(tokenData) };
                callback(200, token);
            }
        });
    } else {
        callback(400, { error: 'You have a problem in your request!' });
    }
};

handler._token.put = (requestProperties, callback) => {
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
        typeof body.password === 'string' && body.password.trim().length > 0
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

handler._token.delete = (requestProperties, callback) => {
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
                callback(500, { error: 'There was a problem in the server side!' });
            } else {
                data.delete('users', phone, (err2) => {
                    if (err2) {
                        callback(500, { error: 'There was a problem in the server side!' });
                    } else {
                        callback(200, { message: 'User was .deleted successfully!' });
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
