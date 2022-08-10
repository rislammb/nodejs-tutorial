/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
const { Buffer } = require('buffer');

// 1 - create zero-filled Buffer of length 8
const buf1 = Buffer.alloc(8);
console.log(buf1);
// create 9 filled Buffer of length 5
const buf2 = Buffer.alloc(5, 9);
console.log(buf2);

// // 2 - creates an uninitialized Buffer of length 7 - faster thean aloc()
// const buf3 = Buffer.allocUnsafe(7);
// console.log(buf3);
// console.log(Buffer.byteLength(buf3, 'utf8'));

// // 3 - create buffer from values
// const bufFrom1 = Buffer.from(['a', 'b', 'c']);
// const bufFrom2 = Buffer.from([257, 257.5, -255, '1']);
// const bufFrom3 = Buffer.from('tést', 'latin1');
// console.log(bufFrom1);
// const ab = new ArrayBuffer(10);
// console.log(ab);
// const buf = Buffer.from(ab, 2, 5); // from(array buffer, byte offset, length)
// console.log(buf);

// // 4 - compare two buffer
// const buf1 = Buffer.from('1234');
// const buf2 = Buffer.from('4321');
// const buf3 = Buffer.from('0123');
// console.log(Buffer.compare(buf1, buf1)); // 0: same
// console.log(Buffer.compare(buf1, buf2)); // -1: not match
// console.log(Buffer.compare(buf1, buf3)); // 1

// // 5 - concat two buffer
// const buf1 = Buffer.from('1234');
// const buf2 = Buffer.from('4321');
// console.log(Buffer.concat([buf1, buf2]));

// // cheack buffer
// const one = Buffer.allocUnsafe(73);
// const two = Buffer.from('hello world');
// const three = new Uint8Array(73);
// console.log(Buffer.isBuffer(one)); // true
// console.log(Buffer.isBuffer(two)); // true
// console.log(Buffer.isBuffer(three)); // false

// // 6 - compare two buffer
// const buf1 = Buffer.from('1234');
// const buf2 = Buffer.from('4321');
// const buf3 = Buffer.from('0123');
// console.log(Buffer.compare(buf1, buf1)); // 0: same
// console.log(Buffer.compare(buf1, buf2)); // -1: not match
// console.log(buf1.compare(buf2)); // -1
// console.log(Buffer.compare(buf1, buf3)); // 1

// // 7 - copy to targeted buffer
// const buf1 = Buffer.from([1, 2, 3, 4, 5, 6]);
// const byf2 = Buffer.allocUnsafe(5);
// buf1.copy(byf2, 1, 2, 5);
// console.log(byf2); // <Buffer 00 03 04 05 00>

// // 8 - iterate buffer: .entries() - return: [index, value]
// const buf = Buffer.from([3, 4, 5, 6, 7, 8]);
// for (const pair of buf.entries()) {
//     console.log(pair);
// }
// // .keys() - return: index
// for (const key of buf.keys()) {
//     console.log(key);
// }
// // .values() - return: value
// for (const value of buf.values()) {
//     console.log(value);
// }

// // 9 - compare equlity
// const buf1 = Buffer.from('ABC');
// const buf2 = Buffer.from('414243', 'hex');
// const buf3 = Buffer.from('ABCD');
// console.log(buf1.equals(buf2)); // true
// console.log(buf1.equals(buf3)); // false

// // 10 - fill buffer with value - .fill()
// const buf1 = Buffer.allocUnsafe(10).fill('d');
// console.log(buf1.toString());
// const buf2 = Buffer.allocUnsafe(10);
// buf2.fill('e');
// console.log(buf2.toString());
// // .write()
// buf2.write('adek', 3, 'utf8');
// console.log(buf2.toString());

// // 11 - check value exist or not in buffer- .includes()
// const buf = Buffer.from('this is a buffer');
// console.log(buf.includes('is a'));
// console.log(buf.includes(97)); // 97 is the decimal ASCII value for 'a'
// console.log(buf.includes('boffer'));
// // .indexOf()
// console.log(buf.indexOf('is a'));
// console.log(buf.indexOf(97)); // 97 is the decimal ASCII value for 'a'
// console.log(buf.indexOf('boffer'));

// // 12 - check length and byteLength
// const buf = Buffer.allocUnsafe(9);
// console.log(buf.length);
// console.log(buf.byteLength);
// // here write in buffer
// buf.write('some random string', 0, 'utf8');
// console.log(buf.length);
// console.log(buf.byteLength);

// // 12 - copy from buffer with originl reference - .subarray()
// const buf = Buffer.allocUnsafe(26);
// for (let i = 0; i < 26; i++) {
//     buf[i] = 97 + i;
// }
// const buf2 = buf.subarray(3, 7);
// console.log(buf2.toString('ascii')); // defg
// // if change in original array - change subarray to
// buf[4] = 33;
// console.log(buf2.toString('ascii')); // d!fg
