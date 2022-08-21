/*
 * Title: Handle Health route
 * Description: Handle Health route
 * Author: Rayhanul Islam
 * Date: 21 Aug 2022
 */

// module scaffolding
const handler = {};

// health route handler
handler.healthHandler = (requestProperties, callback) => {
    console.log('Health route');
    console.log(requestProperties.body);
    return callback(200, 'Hello from health route');
};

// export module
module.exports = handler;
