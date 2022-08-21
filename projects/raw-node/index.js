/*
 * Title: Uptime Monitoring Application
 * Description: A RESTful API to monitor up or down of user defined links
 * Author: Rayhanul Islam
 * Date: 21 Aug 2022
 */

// dpendencies
const http = require('http');
const { handleReqRes } = require('./handlers/index');

// app object - module scaffolding
const app = {};

// configuration
app.config = { port: 3000 };

// create server
app.createServer = () => {
    const server = http.createServer(handleReqRes);
    server.listen(app.config.port, () =>
        console.log(`Server listening on port ${app.config.port}`)
    );
};

// start the server
app.createServer();
