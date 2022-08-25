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

    req.on('end', () => {
        // create object with all request properties
        const requestProperties = {
            method: method.toLowerCase(),
            trimmedPath,
            query,
            headers,
            body,
        };

        const chosenHandler = routes[trimmedPath] ?? notFoundHandler;

        chosenHandler(requestProperties, (stsCode, payload) => {
            const statusCode = typeof stsCode === 'number' ? stsCode : 500;
            const payloadObj = typeof payload === 'object' ? payload : {};
            const payloadString = JSON.stringify(payloadObj);

            // return the final response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });
};

// export module
module.exports = handler;
