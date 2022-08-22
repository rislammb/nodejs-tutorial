/*
 * Title: Not Found route
 * Description: 404 Not Found route
 * Author: Rayhanul Islam
 * Date: 21 Aug 2022
 */

// module scaffolding
const handler = {};

// health route handler
handler.notFoundHandler = (_requestProperties, callback) =>
    callback(404, { message: 'Your request URl was not found!' });

// export module
module.exports = handler;
