const crypto = require('node:crypto');

const hashFunction = crypto.createHash('sha256');

hashFunction.update('Hello, World!');
hashFunction.update('This is a hashing example.');
console.log(hashFunction.digest('hex'));