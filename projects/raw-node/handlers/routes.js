/*
 * Title: Routes
 * Description: Application routes handler
 * Author: Rayhanul Islam
 * Date: 21 Aug 2022
 */

// dependencies
const { healthHandler } = require('./healthHndler');

const routes = {
    health: healthHandler,
};

// export module
module.exports = routes;
