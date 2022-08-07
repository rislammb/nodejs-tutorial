// 1 - use global setTimeout function
// setTimeout(() => console.log('test global object'), 500);
// console.log('start');

// 2 - explore nodejs global object
// console.log(global);

// 3 - top level variable does not atteched global object
// const a = 5;
// console.log(global.a); // undefined

// 4 - get directory and file name
// console.log(__dirname);
// console.log(__filename);

// 5 - node make every/module file like IEFE function
// see inside people module/file

// 6 - import module from another file and use
const people = require('./1.1-people');

console.log(people);
