/* eslint-disable no-cond-assign */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
const {
    scrypt,
    randomFill,
    createCipheriv,
    createDecipheriv,
    createHash,
    createHmac,
} = require('node:crypto');
const { Buffer } = require('buffer');

const algorithm = 'aes-192-cbc';
const password = 'abc123';

// // 1 - data encrypte
// scrypt(password, 'salt', 24, (err, key) => {
//     if (err) throw err;
//     randomFill(new Uint8Array(16), (err2, iv) => {
//         if (err2) throw err;
//         const cipher = createCipheriv(algorithm, key, iv);

//         // // 1: use event for get encrypted data
//         // let encrypted = '';
//         // cipher.setEncoding('hex');
//         // cipher.on('data', (chunk) => (encrypted += chunk));
//         // cipher.on('end', () => console.log(encrypted));
//         // cipher.write('some text', 'utf8');
//         // cipher.end();

//         // 2: use .update() and .final() for encrypted data
//         let encrypted = cipher.update('some clear text data', 'utf8', 'hex');
//         encrypted += cipher.final('hex');
//         console.log('encrypted data =', encrypted);
//     });
// });

// // 2 - data decrypte
// scrypt(password, 'salt', 24, (err, key) => {
//     if (err) throw err;
//     const iv = Buffer.allocUnsafe(16, 0);
//     const decipher = createDecipheriv(algorithm, key, iv);
//     const encrypted = '3676c03198a1f457bae22a98ec08ed174fa2127c069604f88b3cbb2560d9cc5c';

//     // // 1: use event for get decrypted data
//     // let decrypted = '';
//     // decipher.on('readable', () => {
//     //     while ((chunk = decipher.read()) !== null) {
//     //         decrypted += chunk.toString('utf8');
//     //     }
//     // });
//     // decipher.on('end', () => {
//     //     console.log(decrypted);
//     // });
//     // // 1.1: Encrypted with same algorithm, key and iv.
//     // decipher.write(encrypted, 'hex');
//     // decipher.end();

//     // 2: use .update() and .final() for decrypted data
//     let decrypted = decipher.update(encrypted, 'hex', 'utf8');
//     decrypted += decipher.final('utf8');
//     console.log('data after decrypte =', decrypted);
// });

// // 3 - create hash
// const hash = createHash('sha256');
// // // 1: use event for get hash
// // hash.on('readable', () => {
// //     const data = hash.read();
// //     if (data) console.log(data.toString('hex'));
// // });
// // hash.write('some data to hash');
// // hash.end();

// // 2: use .update() for get hash
// hash.update('some data to hash');
// console.log(hash.digest('hex'));

// 4 - create hmac
const hmac = createHmac('sha256', 'a secret key');
// // 1: use event for get hmac hash
// hmac.on('readable', () => {
//     const data = hmac.read();
//     if (data) console.log(data.toString('hex'));
// });
// hmac.write('some data to hash');
// hmac.end();

// 2: use .update() for get hmac hash
hmac.update('some data to hash');
console.log(hmac.digest('hex'));
