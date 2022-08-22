/*
 * Title: Uptime Monitoring Application
 * Description: A RESTful API to monitor up or down of user defined links
 * Author: Rayhanul Islam
 * Date: 21 Aug 2022
 */

// dpendencies
const http = require('http');
const environment = require('./helpers/environments');
const { handleReqRes } = require('./handlers/rootHandler');

// app object - module scaffolding
const app = {};

// create server
app.createServer = () => {
    const server = http.createServer(handleReqRes);
    server.listen(environment.port, () =>
        console.log(`Server listening on port ${environment.port}`)
    );
};

// start the server
app.createServer();
