const fs = require('fs');

// 1 - async file read using path/file descriptor
fs.readFile('hello.txt', 'utf8', (err, data) => {
    if (err) console.log(err);
    console.log('Read file log - ', data);
});
console.log('below read file');

// // 2 - sync file read using path/file descriptor
// const data = fs.readFileSync('hello.txt', 'utf8');
// console.log('Read file log - ', data);
// console.log('below read file');

// // 3 - async file read using 'fd - file descriptor' and close
// fs.open('hello.txt', 'r', (err, fd) => {
//     if (err) console.log(err);
//     fs.read(fd, (err2, bytesRead, buffer) => {
//         if (err2) console.log(err2);
//         console.log('bytes read', bytesRead);
//         console.log('buffer', buffer.toString());
//     });
//     fs.close(fd, (err2) => {
//         if (err2) console.log(err2);
//         console.log('File closed!');
//     });
// });

// // 4 - async directory read - return array with file and directory names
// fs.readdir('./', (err, files) => {
//     if (err) console.log(err);
//     console.log(files);
// });

// // 5 - async open directory - open with directory info
// fs.opendir('./', async (err, dir) => {
//     if (err) console.log(err);
//     console.log(dir);
// });

// // 6 - append to file - if not found: create
// fs.appendFile('good.txt', 'This data is append to good.txt', (err) => {
//     if (err) console.log(err);
//     console.log('Append to file completed!');
// });

// // 7 - async file write using path/file descriptor
// fs.writeFile('good.txt', 'Welcome to nodejs', (err) => {
//     if (err) console.log(err);
//     console.log('File write completed!');
// });

// // 8 - async open file (if not found: flag 'w' create empty) and close
// fs.open('world.txt', 'w', (err, fd) => {
//     if (err) console.log(err);
//     console.log('After open fd - ', fd);
//     fs.close(fd, (err2) => {
//         if (err2) console.log(err);
//         console.log('File close completed!');
//     });
// });

// // 9 - async file write using 'fd - file descriptor'
// fs.open('world.txt', 'w', (err, fd) => {
//     if (err) console.log(err);
//     fs.write(fd, 'Hello world', (err2, written, str) => {
//         if (err2) console.log(err2);
//         console.log('written', written);
//         console.log(str);
//     });
//     fs.close(fd, (err3) => {
//         if (err3) console.log(err);
//         console.log('File close completed!');
//     });
// });

// // 10 - make / create directory
// fs.mkdir('hello', (err) => {
//     if (err) console.log(err);
//     console.log('Directory created!');
// });

// // 11 - copy file
// fs.copyFile('hello.txt', 'world.txt', (err) => {
//     if (err) console.log(err);
//     console.log('File copy completed!');
// });

// // 12 - append to file - append after existing data
// fs.appendFile('world.txt', 'Welcome to Nodejs', (err) => {
//     if (err) console.log(err);
//     console.log('Append to file completed!');
// });

// // 13 - async file rename
// fs.rename('world.txt', 'test.txt', (err) => {
//     if (err) console.log(err);
//     console.log('Rename complete!');
// });

// // 14 - async remove file
// fs.unlink('good.txt', (err) => {
//     if (err) console.log(err);
//     console.log('File removed');
// });

// // 15 - async directory remove - when directory empty
// fs.rmdir('hello', (err) => {
//     if (err) console.log(err);
//     console.log('Directory removed');
// });

// // 16 - async removes files and directories - when directory empty or not
// fs.rm('hello', { recursive: true }, (err) => {
//     if (err) console.log(err);
//     console.log('Directory removed');
// });

// // 17 - async removes files and directories - remove file
// fs.rm('good.txt', (err) => {
//     if (err) console.log(err);
//     console.log('File removed');
// });
