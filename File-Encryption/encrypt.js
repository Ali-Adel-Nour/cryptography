const fs = require('node:fs');
const crypto = require('node:crypto');
const {pipeline} = require('node:stream');

const password = process.env.FILE_ENCRYPTION_PASSWORD || "default_secure_password";

const algorithm = 'aes-256-gcm';

const salt = crypto.randomBytes(16);

const iv = crypto.randomBytes(12);

console.log("Salt:", salt.toString('hex'));
console.log("IV:", iv.toString('hex'));

crypto.pbkdf2(password, salt, 1_000_000, 32, 'sha512', (err, key) => {
    if(err) console.error(err);

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const plaintext = fs.createReadStream('data.txt');
    const encrypted = fs.createWriteStream('data.enc'); //salt+iv+ciphertext+mac

    encrypted.write(salt);
    encrypted.write(iv);

    pipeline(plaintext, cipher, encrypted, (err) => {
        if(err) console.error(err);

        //MAC
        const authCode = cipher.getAuthTag();
        console.log("Auth Code:", authCode.toString('hex'));
        fs.appendFileSync('./data.enc', authCode);
        console.log("File encrypted successfully.");
    });
});