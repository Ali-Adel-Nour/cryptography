const tls =  require('tls');

console.log(`We have ${tls.rootCertificates.length} root CAs in Node.js:\n`);

fs.writeFileSync("./random-cert.pem",tls.rootCertificates[49])

tls.rootCertificates.forEach((pem, i) => {
    console.log(`Root CA ${i + 1}:\n${pem}\n`);
})