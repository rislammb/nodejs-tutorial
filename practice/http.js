const http = require('http');
const url = require('url');

// // 1 - create http server
// http.createServer((_req, res) => {
//     // write respose for client
//     res.write('Hello world!');
//     // end the response
//     res.end();
// }).listen(8080, () => console.log('server listening on port 8080'));

// // 2 - add response header
// http.createServer((_req, res) => {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write('Hello world!');
//     res.end();
// }).listen(8080, () => console.log('server listening on port 8080'));

// // 3 - handle url routing
// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.write('Hello world!');
//         res.write('This is home page');
//     } else if (req.url === '/about') {
//         res.write('This is about page');
//     } else {
//         res.write('Page not found');
//     }
//     res.end();
// });
// server.timeout = 200;
// server.listen(8080, () => console.log('server listening on port 8080'));

// 4 - split query string from url
const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    if (pathname === '/') {
        res.write('Hello world!');
        res.write('This is home page');
    } else if (pathname === '/about') {
        if (query.new === 'true') {
            res.write('This is about page with query new');
        } else {
            res.write('This is about page without new');
        }
    } else {
        res.write('Page not found');
    }
    res.end();
});
server.timeout = 200;
server.listen(8080, () => console.log('server listening on port 8080'));
