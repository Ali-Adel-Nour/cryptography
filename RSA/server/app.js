const crypto = require('crypto');
const fs = require('fs')

let publicKey, privateKey;

if (fs.existsSync('server_public.pem') && fs.existsSync('server_private.pem')) {
    publicKey = fs.readFileSync('server_public.pem', 'utf8');
    privateKey = fs.readFileSync('server_private.pem', 'utf8');
    console.log("Loaded existing server keys.");
} else {
    const keyPair = crypto.generateKeyPairSync("rsa", {
        modulusLength: 1024,
        publicKeyEncoding: {
            type: "spki",
            format: "pem",
        },
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
        },
    });
    publicKey = keyPair.publicKey;
    privateKey = keyPair.privateKey;
    
    fs.writeFileSync("server_public.pem", publicKey);
    fs.writeFileSync("server_private.pem", privateKey);
    console.log("Server keys generated and saved.");
}

// 4. Decrypt the received shared secret (if it exists)
// In a real app, this would happen when the server receives a request
try {
    if (fs.existsSync('encrypted_secret.bin')) {
        const encryptedSecret = fs.readFileSync('encrypted_secret.bin');
        
        const decryptedSecret = crypto.privateDecrypt(
            {
                key: privateKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },
            encryptedSecret
        );
        
        console.log("Decrypted Shared Secret:", decryptedSecret.toString('hex'));
    } else {
        console.log("Waiting for client to send 'encrypted_secret.bin'...");
    }
} catch (err) {
    console.error("Decryption failed:", err.message);
}