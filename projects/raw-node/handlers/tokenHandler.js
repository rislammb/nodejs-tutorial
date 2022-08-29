/* eslint-disable no-underscore-dangle */
/*
 * Title: Token Handler
 * Description: Handler for handle token related route
 * Author: Rayhanul Islam
 * Date: 28 Aug 2022
 */

// dependencies
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
        callback(400, { error: 'There was a problem in your request!' });
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
        callback(400, { error: 'There was a problem in your request!' });
    }
};

handler._token.put = (requestProperties, callback) => {
    const { body } = requestProperties;
    const id = typeof body.id === 'string' && body.id.trim().length === 20 ? body.id.trim() : false;
    const extend = !!(typeof body.extend === 'boolean' && body.extend === true);

    if (id && extend) {
        data.read('tokens', id, (err1, tokenData) => {
            if (err1 || !tokenData) {
                callback(404, { error: 'Requested token was not found!' });
            } else {
                const tokenObj = { ...parseJSON(tokenData) };
                if (tokenObj.expires > Date.now()) {
                    tokenObj.expires = Date.now() + 1000 * 60 * 60;
                    // store the updated token
                    data.update('tokens', id, tokenObj, (err2) => {
                        if (err2) {
                            callback(500, { error: 'There was a problem in the server side!' });
                        } else {
                            callback(201, { message: 'Token updated successfully!' });
                        }
                    });
                } else {
                    callback(400, { error: 'Token was already expired!' });
                }
            }
        });
    } else {
        callback(400, { error: 'There was a problem in your request!' });
    }
};

handler._token.delete = (requestProperties, callback) => {
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
                data.delete('tokens', id, (err2) => {
                    if (err2) {
                        callback(500, { error: 'There was a problem in the server side!' });
                    } else {
                        callback(200, { message: 'Token was deleted successfully!' });
                    }
                });
            }
        });
    } else {
        callback(400, { error: 'There was a problem in your request!' });
    }
};

handler._token.verify = (id, phone, callback) => {
    data.read('tokens', id, (err, tokenData) => {
        if (err || !tokenData) {
            callback(false);
        } else {
            const token = parseJSON(tokenData);
            if (token.phone === phone && token.expires > Date.now()) {
                callback(true);
            } else callback(false);
        }
    });
};

// export module
module.exports = handler;
