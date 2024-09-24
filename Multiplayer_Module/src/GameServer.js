import { WebSocketServer, WebSocket } from 'ws'

class GameServer {
  constructor(port) {
    this.port = port
    this.players = {}
    this.wss = new WebSocketServer({ port: this.port })

    this.wss.on('connection', (ws) => this.handleConnections(ws))
  }

  handleConnections(ws) {
    ws.on('message', (data) => this.handleMessage(ws, data))
    
    ws.send(JSON.stringify({
      type: 'initialPositions',
      players: this.players
    }))
  }

  handleMessage(ws, data) {
    const message = JSON.parse(data);

    if (message.type === 'move') {
      this.players[message.playerId] = { x: message.x, z: message.z }

      this.broadcast(JSON.stringify({
        type: 'updatePosition',
        playerId: message.playerId,
        x: message.x,
        z: message.z
      }), ws)
    }
  }

  broadcast(message, sender) {
    for (const client of this.wss.clients) {
      if (client !== sender && client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    }
  }
}

new GameServer(8080)