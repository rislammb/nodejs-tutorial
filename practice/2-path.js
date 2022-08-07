const path = require('path');

const myPath = 'D:/Practice Project/nodejs-tutorial/practice/path.js';

// console.log(path.basename(myPath)); // path.js
// console.log(path.dirname(myPath)); // D:/Practice Project/nodejs-tutorial/practice
// console.log(path.extname(myPath)); // .js

console.log(path.parse(myPath));

console.log(
    path.format({
        dir: 'learn\\js',
        name: 'app',
        ext: '.ts',
    })
);

// console.log(path.isAbsolute('/learn')); // true
// console.log(path.isAbsolute('learn')); // false

// console.log(path.join('learn', '/node', '/js', '../es')); // learn\node\es
// console.log(path.resolve('learn', '/node', '/js', '../es')); // D:\es

console.log(path.relative('/nodejs/practice/path.js', '/nodejs/project/path.js'));
