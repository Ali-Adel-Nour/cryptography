const tls = require('tls');
const fs = require('fs');
const socket = new tls.TLSSocket();

const server = tls.createServer({
    key: fs.readFileSync('./facebook-private.pem'),
    cert: fs.readFileSync('./facebook-cert.pem')
});

server.on("connection",()=>{
    console.log("Client connected by TCP but secure connection not yet established");
})

server.on("secureConnection", (socket) => {
    console.log("TLS Secure connection established");
    socket.write("Hello from the server!");
    socket.end();
});

socket.on("data", (data) => {
    console.log("Received data from client:", data.toString());
});

server.listen(443, () => {
    console.log("TLS server listening on port 443");
});