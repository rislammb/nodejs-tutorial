const assert = require('assert');

// 1 - value check - if false: throw error
console.log(assert(1)); // undefined - in other words truthy
console.log(assert(0)); // error - in other words falsy
console.log(assert(50 > 70, 'Here set error message')); // error - falsy
console.log(assert.ok(50 < 70, 'Here set error message')); // undefined - truthy

// // 2 - check equal
// console.log(assert.equal(1, 1)); // undefined - in other words equal
// console.log(assert.equal(1, '1')); // undefined - equal
// console.log(assert.strictEqual(1, '1')); // error - in other words not strictly equal
// console.log(assert.equal({ a: 1 }, { a: 1 })); // error - in other words not equal

// // 3 - check not equal
// console.log(assert.notEqual(1, 1)); // error - equal
// console.log(assert.notEqual(1, '1')); // error
// console.log(assert.notStrictEqual(1, '1')); // undefined - not strictly equal
// console.log(assert.notEqual({ a: 1 }, { a: 1 })); // undefined - not equal

// // 4 - check deeply equal
// const obj1 = {
//     a: {
//         b: 1,
//     },
// };
// const obj2 = {
//     a: {
//         b: '1',
//     },
// };
// const obj3 = Object.create(obj1);
// console.log(assert.deepEqual(obj1, obj2)); // undefined - in other words deeply equal
// console.log(assert.deepEqual(obj1, obj3)); // error - not deeply equal
// console.log(assert.deepStrictEqual(obj1, obj2)); // error - not strictly deep equal

// // 5 - check not deeply equal
// const obj1 = {
//     a: {
//         b: 1,
//     },
// };
// const obj2 = {
//     a: {
//         b: '1',
//     },
// };
// const obj3 = Object.create(obj1);
// console.log(assert.notDeepEqual(obj1, obj2)); // error - in other words deeply equal
// console.log(assert.notDeepEqual(obj1, obj3)); // undefined - not deeply equal
// console.log(assert.notDeepStrictEqual(obj1, obj2)); // undefined - not strictly deep equal

// // 6 - check match - from string with regual expression
// console.log(assert.match('a will pass again', /pass/)); // undefined - in other worlds match
// console.log(assert.match('not match', /pass/)); // error
