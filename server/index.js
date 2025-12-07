const http = require('http');
const express = require('express');
const colyseus = require('colyseus');
const { GameRoom } = require('./rooms');

const app = express();
const server = http.createServer(app);
const gameServer = new colyseus.Server({ server });

gameServer.define('reporoom', GameRoom);

app.use(express.static('../client'));

const PORT = process.env.PORT || 2567;
server.listen(PORT, () => {
    console.log(Сервер запущен на порту ${PORT});
});
