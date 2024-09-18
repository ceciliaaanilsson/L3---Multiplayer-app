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

    // Hantera spelarens rörelsemeddelande
    if (message.type === 'move') {
      console.log(`Player moved to x=${message.x}, z=${message.z}`)

      // Skicka tillbaka den nya positionen till alla klienter (inklusive spelaren)
      this.broadcast(JSON.stringify({
        type: 'updatePosition',
        x: message.x,
        z: message.z
      }))
    }
  }

  broadcast(message) {
    for (const client of this.wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message) // Skicka meddelandet till alla klienter
      }
    }
  }
}
new GameServer(8080)