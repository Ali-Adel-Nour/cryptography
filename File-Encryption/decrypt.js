const fs = require('node:fs');
const crypto = require('node:crypto');


const password = process.env.FILE_ENCRYPTION_PASSWORD || "default_secure_password";

const algorithm = 'aes-256-gcm';

const fd = fs.openSync('./data.enc', 'r');
const fileSize = fs.fstatSync(fd).size;

const salt = Buffer.alloc(16);
const iv = Buffer.alloc(12);
const authTag = Buffer.alloc(16);


/**
 * First 16 bytes: salt
 * Next 12 bytes: iv
 * Next N bytes: ciphertext
 * Last 16 bytes: Message Authentication Code (MAC)
 */

fs.readSync(fd, salt, 0, 16, 0);
fs.readSync(fd, iv, 0, 12, 16);
fs.readSync(fd, authTag, 0, 16, fileSize - 16);

console.log("Salt:", salt.toString('hex'));
console.log("IV:", iv.toString('hex'));
console.log("Auth Tag:", authTag.toString('hex'));


crypto.pbkdf2(password, salt, 1_000_000, 32, 'sha512', (err, key) => {
    if(err) return console.error(err);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(authTag);
    const encrypted = fs.createReadStream('data.enc', {start: 28, end: fileSize - 17});
    const decrypted = fs.createWriteStream('data.dec');
    encrypted.pipe(decipher).pipe(decrypted);

    decrypted.on('finish', () => {
        console.log("File decrypted successfully.");
    });
});