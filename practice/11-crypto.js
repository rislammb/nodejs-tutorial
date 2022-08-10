/* eslint-disable no-cond-assign */
/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
const { scrypt, randomFill, createCipheriv, createDecipheriv } = require('crypto');
const { Buffer } = require('buffer');

const algorithm = 'aes-192-cbc';
const password = 'abc123';

// 1 - data encrypte
scrypt(password, 'salt', 24, (err, key) => {
    if (err) throw err;
    randomFill(new Uint8Array(16), (err2, iv) => {
        if (err2) throw err;
        const cipher = createCipheriv(algorithm, key, iv);

        // // 1 - use event for get encrypted data
        // let encrypted = '';
        // cipher.setEncoding('hex');
        // cipher.on('data', (chunk) => (encrypted += chunk));
        // cipher.on('end', () => console.log(encrypted));
        // cipher.write('some text', 'utf8');
        // cipher.end();

        // 2 - use .update() and .final() for encrypted data
        let encrypted = cipher.update('some clear text data', 'utf8', 'hex');
        encrypted += cipher.final('hex');
        console.log(encrypted);
    });
});

// 2 - data decrypte
scrypt(password, 'salt', 24, (err, key) => {
    if (err) throw err;
    const iv = Buffer.allocUnsafe(16, 0);
    const decipher = createDecipheriv(algorithm, key, iv);

    let decrypted = '';
    decipher.on('readable', () => {
        while ((chunk = decipher.read()) !== null) {
            decrypted += chunk.toString('utf8');
        }
    });
    decipher.on('end', () => {
        console.log(decrypted);
    });

    // Encrypted with same algorithm, key and iv.
    const encrypted = 'e07ca44f5ccb8c4dfbe6dd31d6b3e39309f12944aaf143ea88d4be25ba0ed72d';
    decipher.write(encrypted, 'hex');
    decipher.end();
});
