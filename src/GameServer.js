import { WebSocketServer } from 'ws'

class GameServer {
  constructor(port) {
    this.port = port
    this.wss = new WebSocketServer({ port: this.port })

    this.wss.on('connection', (ws) => this.handleConnections(ws))
  }

  async handleConnections(ws) {
    ws.on('error', (error) => console.error('Websocket error:', error))

    ws.on('message', (data) => console.log('Received message:', data.toString()))

    ws.send('Connected to the server:')
  }
}
new GameServer(8080)