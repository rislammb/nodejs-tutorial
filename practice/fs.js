const fs = require('fs');

// fs.writeFileSync('hello.txt', 'Hello world!');
// fs.appendFileSync('hello.txt', 'How are you?');

// const data = fs.readFileSync('hello.txt');
// console.log(data.toString());

fs.readFile('hello.txt', (err, data) => {
    console.log(data.toString());
});
console.log('check async file read!');
