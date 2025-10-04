const fs = require("fs");

const key = fs.readFileSync("./key");

// Imagine that the key is now deleted from the file system once both entities have a copy

let keyOffset = 0;

// Decrypt with one-time pad encryption
function decrypt(ciphertext) {
  if (keyOffset + ciphertext.length > key.length) {
    return console.error("Key length not enough to decrypt this message.");
  }

  const plaintext = Buffer.alloc(ciphertext.length);

  // Loop through the data and decrypt each byte
  for (let i = 0; i < plaintext.length; i++) {
    plaintext[i] = ciphertext[i] ^ key[keyOffset + i]; // XOR
    key[keyOffset + i] = 0; // destroy the used part of the key
  }

  keyOffset += ciphertext.length;

  return plaintext;
}

const ciphertext1 = Buffer.from("2b381a64ab4a7a142016d0b41a8def661b61bec2ef705188e197f82a3b67d5fa304b386f4df770 ", "hex");
const ciphertext2 = Buffer.from("9ba07bab3992f8ba253cf6745d0c2ffa80893a7c540c0819e3ffb6452e8a1aa0044394828217c3535ab", "hex");

const plaintext1 = decrypt(ciphertext1);
const plaintext2 = decrypt(ciphertext2);
console.log(plaintext1.toString("utf8"));
console.log(plaintext2.toString("utf8"));
