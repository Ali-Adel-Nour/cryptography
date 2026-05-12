function simpleHash(message) {
  const primes = [
    1000000, 5000000, 10000000, 999999999, 1234567890,
    1000000007, 1000000009, 1000000021, 1000000033, 1000000087
  ];
  for (let i = 0; i < message.length; i++) {
    let temp = message[i] * primes[i % 10];
    message[i] = message[i] ^ temp;
}

for (let i = 0; i < message.length; i++) {
    message[i] = message[i] >> 2 //shift right by 2 bits
}
let result = 0;
for (let i = 0; i < message.length; i++) {
    result += message[i] * primes[i % 10];
    result = result % 4294967295;
}
const resultBuffer = Buffer.alloc(4);
resultBuffer.writeUInt32BE(result, 0);
return resultBuffer;
}

const digest = simpleHash(Buffer.from("Hello", "utf-8"));
console.log(digest.toString("hex"));
