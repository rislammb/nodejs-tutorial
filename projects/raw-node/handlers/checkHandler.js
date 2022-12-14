/* eslint-disable no-underscore-dangle */
/*
 * Title: Check Handler
 * Description: Handler for handle user defined URl check
 * Author: Rayhanul Islam
 * Date: 29 Aug 2022
 */

// dependendies
const data = require('../lib/data');
const { parseJSON, createRandomString } = require('../helpers/utilities');
const {
    _token: { verify },
} = require('./tokenHandler');
const { maxChecks } = require('../helpers/environments');

// module scaffolding
const handler = {};

// user route handler
handler.checkHandler = (requestProperties, callback) => {
    const acceptedMethod = ['get', 'post', 'put', 'delete'];

    if (acceptedMethod.indexOf(requestProperties.method) < 0) {
        callback(405);
    } else {
        handler._check[requestProperties.method](requestProperties, callback);
    }
};

handler._check = {};

handler._check.post = (requestProperties, callback) => {
    const { body, headers } = requestProperties;
    // validate inputs
    const protocol =
        typeof body.protocol === 'string' && ['http', 'https'].indexOf(body.protocol) > -1
            ? body.protocol
            : false;
    const url =
        typeof body.url === 'string' && body.url.trim().length > 0 ? body.url.trim() : false;
    const method =
        typeof body.method === 'string' &&
        ['get', 'post', 'put', 'delete'].indexOf(body.method.toLowerCase()) > -1
            ? body.method.toLowerCase()
            : false;
    const successCode =
        typeof body.successCode === 'object' && body.successCode instanceof Array
            ? body.successCode
            : false;
    const timeoutSeconds =
        typeof body.timeoutSeconds === 'number' &&
        body.timeoutSeconds % 1 === 0 &&
        body.timeoutSeconds >= 1 &&
        body.timeoutSeconds <= 5
            ? body.timeoutSeconds
            : false;

    if (protocol && url && method && successCode && timeoutSeconds) {
        // lookup the user phone by reading the token
        const token = typeof headers.token === 'string' ? headers.token : false;
        if (token) {
            data.read('tokens', token, (err1, tokenData) => {
                if (err1 || !tokenData) {
                    callback(403, { error: 'Authentication failed!' });
                } else {
                    const { phone } = parseJSON(tokenData);
                    // verify token
                    verify(token, phone, (valid) => {
                        if (valid) {
                            // lookup the user data
                            data.read('users', phone, (err2, userData) => {
                                if (err2 || !userData) {
                                    callback(404, { error: 'User not found!' });
                                } else {
                                    const user = parseJSON(userData);
                                    const userChecks =
                                        typeof user.checks === 'object' &&
                                        user.checks instanceof Array
                                            ? user.checks
                                            : [];
                                    if (userChecks.length < maxChecks) {
                                        // create check object
                                        const checkId = createRandomString(20);
                                        const checkObj = {
                                            id: checkId,
                                            phone,
                                            protocol,
                                            url,
                                            method,
                                            successCode,
                                            timeoutSeconds,
                                        };

                                        // save the check object to database
                                        data.create('checks', checkId, checkObj, (err3) => {
                                            if (err3) {
                                                callback(500, {
                                                    error: 'There was a problem in the server side!',
                                                });
                                            } else {
                                                // add checkId to user's object
                                                user.checks = userChecks;
                                                user.checks.push(checkId);

                                                // update user database with new check
                                                data.update('users', phone, user, (err4) => {
                                                    if (err4) {
                                                        callback(500, {
                                                            error: 'There was a problem in the server side!',
                                                        });
                                                    } else {
                                                        callback(201, user);
                                                    }
                                                });
                                            }
                                        });
                                    } else {
                                        callback(401, {
                                            error: 'User has already reached max checks limit!',
                                        });
                                    }
                                }
                            });
                        } else {
                            callback(403, { error: 'Authentication failed!' });
                        }
                    });
                }
            });
        } else {
            callback(403, { error: 'Authentication failed! Token not found.' });
        }
    } else {
        callback(400, { error: 'There was a problem in your request!' });
    }
};

handler._check.get = (requestProperties, callback) => {
    const { query, headers } = requestProperties;
    // validate check id
    const id =
        typeof query.id === 'string' && query.id.trim().length === 20 ? query.id.trim() : false;

    if (id) {
        const token = typeof headers.token === 'string' ? headers.token : false;
        if (token) {
            // lookup the check
            data.read('checks', id, (err, checkData) => {
                if (err || !checkData) {
                    callback(404, { error: 'Requested check was not found!' });
                } else {
                    const check = parseJSON(checkData);
                    verify(token, check.phone, (valid) => {
                        if (valid) {
                            callback(200, check);
                        } else {
                            callback(403, { error: 'Authentication failed!' });
                        }
                    });
                }
            });
        } else {
            callback(403, { error: 'Authentication failed! Token not found.' });
        }
    } else {
        callback(400, { error: 'There was a problem in your request!' });
    }
};

handler._check.put = (requestProperties, callback) => {
    const { body, headers } = requestProperties;
    // validate inputs
    const id = typeof body.id === 'string' && body.id.trim().length === 20 ? body.id.trim() : false;

    const protocol =
        typeof body.protocol === 'string' && ['http', 'https'].indexOf(body.protocol) > -1
            ? body.protocol
            : false;
    const url =
        typeof body.url === 'string' && body.url.trim().length > 0 ? body.url.trim() : false;
    const method =
        typeof body.method === 'string' &&
        ['get', 'post', 'put', 'delete'].indexOf(body.method.toLowerCase()) > -1
            ? body.method.toLowerCase()
            : false;
    const successCode =
        typeof body.successCode === 'object' && body.successCode instanceof Array
            ? body.successCode
            : false;
    const timeoutSeconds =
        typeof body.timeoutSeconds === 'number' &&
        body.timeoutSeconds % 1 === 0 &&
        body.timeoutSeconds >= 1 &&
        body.timeoutSeconds <= 5
            ? body.timeoutSeconds
            : false;

    if (id) {
        if (protocol || url || method || successCode || timeoutSeconds) {
            const token = typeof headers.token === 'string' ? headers.token : false;
            if (token) {
                // lookup the check
                data.read('checks', id, (err1, checkData) => {
                    if (err1 || !checkData) {
                        callback(404, { error: 'Requested check was not found!' });
                    } else {
                        const check = parseJSON(checkData);
                        verify(token, check.phone, (valid) => {
                            if (valid) {
                                if (protocol) {
                                    check.protocol = protocol;
                                }
                                if (url) {
                                    check.url = url;
                                }
                                if (method) {
                                    check.method = method;
                                }
                                if (successCode) {
                                    check.successCode = successCode;
                                }
                                if (timeoutSeconds) {
                                    check.timeoutSeconds = timeoutSeconds;
                                }
                                // update check with new data
                                data.update('checks', id, check, (err2) => {
                                    if (err2) {
                                        callback(500, {
                                            error: 'There was a problem in the server side!',
                                        });
                                    } else {
                                        callback(201);
                                    }
                                });
                            } else {
                                callback(403, { error: 'Authentication failed!' });
                            }
                        });
                    }
                });
            } else {
                callback(403, { error: 'Authentication failed! Token not found.' });
            }
        } else {
            callback(400, { error: 'You must provide at least one field to update!' });
        }
    } else {
        callback(400, { error: 'There was a problem in your request!' });
    }
};

handler._check.delete = (requestProperties, callback) => {
    const { query, headers } = requestProperties;
    // validate check id
    const id =
        typeof query.id === 'string' && query.id.trim().length === 20 ? query.id.trim() : false;

    if (id) {
        const token = typeof headers.token === 'string' ? headers.token : false;
        if (token) {
            // lookup the check
            data.read('checks', id, (err1, checkData) => {
                if (err1 || !checkData) {
                    callback(404, { error: 'Requested check was not found!' });
                } else {
                    const { phone } = parseJSON(checkData);
                    verify(token, phone, (valid) => {
                        if (valid) {
                            // delete the check
                            data.delete('checks', id, (err2) => {
                                if (err2) {
                                    callback(500, {
                                        error: 'There was a problem in the server side!',
                                    });
                                } else {
                                    // delete check id from user data
                                    data.read('users', phone, (err3, userData) => {
                                        if (err3 || !userData) {
                                            callback(500, {
                                                error: 'There was a problem in the server side!',
                                            });
                                        } else {
                                            const user = parseJSON(userData);
                                            const checks =
                                                typeof user.checks === 'object' &&
                                                user.checks instanceof Array
                                                    ? user.checks
                                                    : [];
                                            const checkIndex = checks.indexOf(id);

                                            if (checkIndex > -1) {
                                                checks.splice(checkIndex, 1);
                                                // update user with new checks data
                                                user.checks = checks;
                                                data.update('users', phone, user, (err4) => {
                                                    if (err4) {
                                                        callback(500, {
                                                            error: 'There was a problem in the server side!',
                                                        });
                                                    } else {
                                                        callback(200, {
                                                            message:
                                                                'Check was deleted successfully!',
                                                        });
                                                    }
                                                });
                                            } else {
                                                callback(500, {
                                                    error: 'Request check was not found in user data!',
                                                });
                                            }
                                        }
                                    });
                                }
                            });
                        } else {
                            callback(403, { error: 'Authentication failed!' });
                        }
                    });
                }
            });
        } else {
            callback(403, { error: 'Authentication failed! Token not found.' });
        }
    } else {
        callback(400, { error: 'There was a problem in your request!' });
    }
};

// export module
module.exports = handler;
