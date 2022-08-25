/*
 * Title: Handle User route
 * Description: Handle User route
 * Author: Rayhanul Islam
 * Date: 25 Aug 2022
 */

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
    callback(200, { m: 'user post' });
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
