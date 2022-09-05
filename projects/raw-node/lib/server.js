/*
 * Title: Server library
 * Description: Server related functions
 * Author: Rayhanul Islam
 * Date: 05 Sep 2022
 */

// dpendencies
const http = require('http');
const { handleReqRes } = require('../handlers/rootHandler');

// server object - module scaffolding
const server = {};

// configuration
server.config = {
    port: 3000,
};

// create server
server.init = () => {
    const port = process.env.port ?? server.config.port;

    const createdServer = http.createServer(handleReqRes);
    createdServer.listen(port, () => console.log(`Server listening on port ${port}`));
};

// export module
module.exports = server;
