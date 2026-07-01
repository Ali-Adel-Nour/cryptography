const crypto = require('crypto');

const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    
});

const dataToSign = Buffer.from("Hello, this is a sample message to be signed.");

const sign = crypto.createSign('SHA256');
sign.update(dataToSign);
sign.end();


const signature = sign.sign(privateKey)

//Third-party verification of the signature using the public key


const dataToVerify = Buffer.from("Hello, this is a sample message to be signed.");

const verify = crypto.createVerify('SHA256');
verify.update(dataToVerify);
verify.end();

const isSignatureValid = verify.verify(publicKey, signature);
console.log("Is the signature valid?", isSignatureValid);