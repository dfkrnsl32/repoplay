const colyseus = require('colyseus');

class GameRoom extends colyseus.Room {
    onCreate(options) {
        this.setState({ players: {} });

        this.onMessage("move", (client, message) => {
            if(this.state.players[client.sessionId])
                this.state.players[client.sessionId].position = message.position;
            this.broadcast("update", this.state.players);
        });
    }

    onJoin(client, options) {
        this.state.players[client.sessionId] = {
            name: options.name || "Streamer",
            position: { x: 0, y: 0, z: 0 },
            level: 1,
            money: 0,
        };
    }

    onLeave(client, consented) {
        delete this.state.players[client.sessionId];
    }
}

module.exports = { GameRoom };
