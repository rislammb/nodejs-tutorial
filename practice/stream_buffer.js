const fs = require('fs');
const http = require('http');

// // 1 - create read stream: return buffer chunk
// const rs = fs.createReadStream(`${__dirname}/lorem.txt`, 'utf8');
// rs.on('data', (chunk) => {
//     console.log(chunk);
// });

// // 2 - create write stream with buffer chunk
// const readStream = fs.createReadStream(`${__dirname}/lorem.txt`, 'utf8');
// const writeStream = fs.createWriteStream(`${__dirname}/output.txt`);
// // // manually read and write stream
// // readStream.on('data', (chunk) => {
// //     writeStream.write(chunk);
// // });
// // smart read and write stream with- pipe
// readStream.pipe(writeStream);

// // 3 - handle buffer stream from browser request
// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.write(`
//           <html>
//           <head>
//           <title>Html Form</title>
//           </head>
//           <body><form method='post' action='/process'><input name='message' /></form></body>
//           </html>
//         `);
//         res.end();
//     } else if (req.url === '/process' && req.method === 'POST') {
//         const body = [];
//         req.on('data', (chunk) => {
//             body.push(chunk);
//         });
//         req.on('end', () => {
//             const strData = Buffer.concat(body).toString();
//             console.log('stream finished!');
//             res.write(strData);
//             res.end();
//         });
//     } else {
//         res.write('Page not found');
//         res.end();
//     }
// });
// server.listen(8080, () => console.log('server listening on port 8080'));

// // 4 - receive JSON request buffer and process to body object
// const server = http.createServer((req, res) => {
//     if (req.url === '/' && req.method === 'POST') {
//         let body = '';
//         req.setEncoding = 'utf8';

//         req.on('data', (chunk) => {
//             body += chunk;
//         });

//         req.on('end', () => {
//             try {
//                 const data = JSON.parse(body);
//                 console.log(data);
//                 return res.end('POST: method of process route');
//             } catch (err) {
//                 res.statusCode = 400;
//                 return res.end(`Bad JSON: ${err.message}`);
//             }
//         });
//     } else {
//         res.end('404 Not Found');
//     }
// });
// server.listen(8080, () => console.log('server listening on port 8080'));

// 5 - create read stream and send to client as response
const server = http.createServer((_req, res) => {
    const readStream = fs.createReadStream(`${__dirname}/lorem.txt`, 'utf8');
    readStream.pipe(res);
});
server.listen(8080, () => console.log('server listening on port 8080'));
