const tls = require('tls');

const options = {
    host: "www.facebook.com",
    port: 443,

}

const client = tls.connect(options, () => {
    console.log("TLS Secure connection established with the server");
    console.log(client.getPeerCertificate());
    console.log(client.getCipher());
    client.write("Hello from the client!");
});

client.on("data", (data) => {
    console.log("Received data from server:", data.toString());
    client.end();
});
