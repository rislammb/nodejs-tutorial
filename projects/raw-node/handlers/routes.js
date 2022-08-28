/*
 * Title: Routes
 * Description: Application routes handler
 * Author: Rayhanul Islam
 * Date: 21 Aug 2022
 */

// dependencies
const { healthHandler } = require('./healthHandler');
const { userHandler } = require('./userHandler');
const { tokenHandler } = require('./tokenHandler');

const routes = {
    health: healthHandler,
    user: userHandler,
    token: tokenHandler,
};

// export module
module.exports = routes;
