// 1
// setTimeout(() => console.log('test global object'), 500);
// console.log('start');

// 2
// console.log(global);

// 3
// const a = 5;
// console.log(global.a); // undefined

// 4
// console.log(__dirname);
// console.log(__filename);

// 5 - node make every/module file like IEFE function
// see inside people function

// 6
const people = require('./people');

console.log(people);
