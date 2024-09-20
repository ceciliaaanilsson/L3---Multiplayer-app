import { WebSocketServer, WebSocket } from 'ws'

class GameServer {
  constructor(port) {
    this.port = port
    this.wss = new WebSocketServer({ port: this.port })

    this.wss.on('connection', (ws) => this.handleConnections(ws))
  }

  async handleConnections(ws) {
    ws.on('error', (error) => console.error('Websocket error:', error))

    ws.on('message', (data) => this.handleMessage(ws, data))
  }

  handleMessage(ws, data) {
    const message = JSON.parse(data)

    if (message.type === 'move') {
      this.broadcast(JSON.stringify({
        type: 'updatePosition',
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