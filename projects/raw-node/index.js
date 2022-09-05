/*
 * Title: Uptime Monitoring Application
 * Description: Initial file to start the node server and workers for a RESTful API to monitor up or down of user defined links
 * Author: Rayhanul Islam
 * Date: 05 Sep 2022
 */

// dpendencies
const server = require('./lib/server');
const worker = require('./lib/worker');

// app object - module scaffolding
const app = {};

// create server and start worker
app.init = () => {
    // start the server
    server.init();

    // start the worker
    worker.init();
};

// invoke init function
app.init();
