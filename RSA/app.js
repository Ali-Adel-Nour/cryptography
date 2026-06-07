const crypto = require('node:crypto');
const fs = require('node:fs');


// const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa",{
//     modulusLength: 2054,
//     publicKeyEncoding: {
//         type: "spki",
//         format: "pem",
//     },
//     privateKeyEncoding: {
//         type: "pkcs8",
//         format: "pem"
//     }
// })

// console.log("Public Key:", publicKey);
// console.log("Private Key:", privateKey);

// fs.writeFileSync("private.pem", privateKey);
// fs.writeFileSync("public.pem", publicKey);

// const privateKeyPem = fs.readFileSync("private.pem", "utf-8");
// const publicKeyPem = fs.readFileSync("public.pem", "utf-8");

const privateKey = crypto.createPrivateKey(fs.readFileSync("private.pem", "utf-8"));
const publicKey = crypto.createPublicKey(fs.readFileSync("public.pem", "utf-8"));

const plaintext = Buffer.from("This is my password $#*U(R&FY","utf8");
const ciphertext = crypto.publicEncrypt({key:publicKey}, plaintext);
console.log(ciphertext)

const decryptedData = crypto.privateDecrypt({key:privateKey}, ciphertext);
console.log(decryptedData.toString("utf-8"));
crypto.privateEncrypt;
crypto.publicDecrypt;
crypto.privateDecrypt({key:privateKey}, ciphertext);