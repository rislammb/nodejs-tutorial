/*
 * Title: Handle Health route
 * Description: Handle Health route
 * Author: Rayhanul Islam
 * Date: 21 Aug 2022
 */

// module scaffolding
const handler = {};

// health route handler
handler.healthHandler = (_requestProperties, callback) =>
    callback(200, { message: 'Hello from health route' });

// export module
module.exports = handler;
