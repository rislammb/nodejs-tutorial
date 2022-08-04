/* eslint-disable no-plusplus */
const EventEmitter = require('events');
const fs = require('fs');

const myEmitter = new EventEmitter();

// 1 - simple events
// register event listeners
myEmitter.on('event', () => {
    console.log('an event emit');
});
// trigger the event
myEmitter.emit('event');

// // 2 - passing arguments in events
// myEmitter.on('event', function (a, b) {
//     console.log(a, b, this, this === myEmitter);
// });
// myEmitter.emit('event', 3, 7);

// // 3 - asynchronous in events
// myEmitter.on('async', (a, b) => {
//     setImmediate(() => console.log('this happens asynchronously'));
//     console.log('after set immediate', a, b);
// });
// myEmitter.emit('async', 3, 5);

// // 4 - handle events only once
// let count = 0;
// myEmitter.once('count', () => {
//     console.log(++count);
// });
// myEmitter.emit('count');

// // 5 - error events
// myEmitter.on('error', () => {
//     console.error('whoops! there was an error');
// });
// myEmitter.emit('error', new Error('whoops!'));

// // 6 - emit - synchronously calls every listeners
// myEmitter.on('event', () => console.log('frist listner'));
// myEmitter.on('event', (a, b) => console.log('second listner', a + b));
// myEmitter.on('event', (...args) => console.log('third listner', args));
// console.log(myEmitter.listeners('event'));
// myEmitter.emit('event', 1, 3, 5, 7, 9);

// // 7 - get all events name
// myEmitter.on('frist', () => {});
// myEmitter.on('second', () => {});
// console.log(myEmitter.eventNames());

// // 8 - remove listener
// function log() {
//     console.log('log');
// }
// myEmitter.on('event', log);
// myEmitter.removeListener('event', log);
// myEmitter.once('event', log);
// myEmitter.emit('event');

// 9 - listener for open event, after file open
const rs = fs.createReadStream('./hello.txt', 'utf8');
rs.on('open', (fd) => console.log('The file is open, fd -', fd));
