const crypto = require('node:crypto');
const password = "aliadel"
const salt = crypto.randomBytes(16).toString('hex');
const iterations = 100000;
const keyLength = 64; //512bits
const digest = 'sha512';

const blockIndex = Buffer.alloc(4);
blockIndex.writeUInt32BE(1, 0); // Block index (1-based)
const hmac = crypto.createHmac(digest, password)
    .update(Buffer.concat([Buffer.from(salt, 'hex'), blockIndex]))
    console.log("Hmac output:", hmac.digest('hex'));

crypto.pbkdf2(password, salt, iterations, keyLength, digest, (err, derivedKey) => {
    if(err) console.error(err);
    console.log("Derived Key:", derivedKey.toString('hex'));
});