/*
 * Title: Handle Request Response
 * Description: Handle Request and Response
 * Author: Rayhanul Islam
 * Date: 21 Aug 2022
 */

// dependencies
const url = require('url');
const routes = require('./routes');
const { notFoundHandler } = require('./notFoundHandler');

// module scaffolding
const handler = {};

// request and response handler
handler.handleReqRes = (req, res) => {
    // request handle
    const { url: reqUrl, method, headers } = req;
    const { pathname, query } = url.parse(reqUrl, true);
    const trimmedPath = pathname.replace(/^\/+|\/+$/g, '');

    let body = '';
    req.setEncoding = 'utf8';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {});

    const requestProperties = { method, trimmedPath, query, headers, body };

    const chosenHandler = routes[trimmedPath] ?? notFoundHandler;
    chosenHandler(requestProperties, (statusCode, payload) => {
        res.statusCode = statusCode;
        res.end(payload);
    });
};

// export module
module.exports = handler;
