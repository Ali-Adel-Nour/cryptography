const crypto = require('crypto');
const fs = require('fs');

const sharedSecretData = crypto.randomBytes(48)

console.log("Shared Secret Data:", sharedSecretData.toString('hex'));

// 1. Read the server's public key
const serverPublicKey = fs.readFileSync('../server/server_public.pem', 'utf8');

// 2. Encrypt the shared secret using the server's public key
const encryptedSecret = crypto.publicEncrypt(
    {
        key: serverPublicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
    },
    sharedSecretData
);

// 3. Save the encrypted data to a file (simulating sending it to the server)
fs.writeFileSync('../server/encrypted_secret.bin', encryptedSecret);

console.log("Shared secret encrypted and sent to server!");