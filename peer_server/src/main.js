const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const server = http.createServer(app);
const { ExpressPeerServer } = require('peer');
const port = 4000;

// Might want to set up ssl stuff here?
const peerServer = ExpressPeerServer(server, {
    proxied: true,
    debug: true,
    path: '/peer_server',
    ssl: {}
});

app.use(peerServer);

server.listen(port);
console.log('Listening on: ' + port);
