/*
 * Title: Not Found route
 * Description: 404 Not Found route
 * Author: Rayhanul Islam
 * Date: 21 Aug 2022
 */

// module scaffolding
const handler = {};

// health route handler
handler.notFoundHandler = (_requestProperties, callback) => {
    console.log('not found route');
    return callback(404, 'Hello from 404 route');
};

// export module
module.exports = handler;
