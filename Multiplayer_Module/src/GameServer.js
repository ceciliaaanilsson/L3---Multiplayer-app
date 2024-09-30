import { WebSocketServer, WebSocket } from 'ws'

export class GameServer {
  constructor(port) {
    this.port = port
    this.players = {}
    this.wss = new WebSocketServer({ port: this.port })

    this.wss.on('connection', (ws) => {
      this.handleConnections(ws)
    })
      
  }

  handleConnections(ws) {
    ws.on('message', (data) => this.handleMessage(ws, data))
  
    ws.on('close', () => {
      const playerId = ws.playerId
      if (playerId && this.players[playerId]) {
        delete this.players[playerId]
        console.log(this.players)
        console.log(`Player ${playerId} disconnected.`)
  

        this.broadcast(JSON.stringify({
          type: 'playerDisconnected',
          playerId: playerId
        }), ws)
      }
    })
  
    ws.send(JSON.stringify({
      type: 'initialPositions',
      players: this.players
    }))
  }

  handleMessage(ws, data) {
    const message = JSON.parse(data)
    if (message.type === 'newPlayer') {
      ws.playerId = message.playerId
      this.players[message.playerId] = { x: message.x, z: message.z }
      console.log('New player connected:', this.players)
      
      this.broadcast(JSON.stringify({
        type: 'updatePosition',
        playerId: message.playerId,
        x: message.x,
        z: message.z
      }), ws)
    }
  
    if (message.type === 'move') {
      this.players[message.playerId] = { x: message.x, z: message.z }
      console.log('Updated players:', this.players)
      
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
