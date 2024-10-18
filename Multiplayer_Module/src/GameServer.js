import { WebSocketServer, WebSocket } from 'ws'

/**
 * GameServer class that manages WebSocket connections for a multiplayer game.
 */
export class GameServer {
  /**
   * Creates a new GameServer instance and sets up the WebSocket server.
   * @param {number} port - The port number on which the WebSocket server will listen.
   */
  constructor(port) {
    this.port = port
    this.players = {}
    this.wss = new WebSocketServer({ port: this.port })

    this.wss.on('connection', (ws) => {
      this.handleConnections(ws)
    })
  }

  /**
   * Handles new WebSocket connections and listens for incoming messages or disconnections.
   * @param {WebSocket} ws - The WebSocket instance for the connected client.
   */
  handleConnections(ws) {
    ws.on('message', (data) => this.handleMessage(ws, data))
  
    ws.on('close', (ws) => this.onClose(ws))
  
    ws.send(JSON.stringify({
      type: 'initialPositions',
      players: this.players
    }))
  }

  onClose(ws) {
    const playerId = ws.playerId
    if (playerId && this.players[playerId]) {
      delete this.players[playerId]
      console.log(`Player ${playerId} disconnected.`)

      this.broadcast(JSON.stringify({
        type: 'playerDisconnected',
        playerId: playerId
      }), ws)
    }
  }

  /**
   * Handles incoming messages from clients. It processes different message types
   * like 'newPlayer' and 'move'.
   * @param {WebSocket} ws - The WebSocket instance for the connected client.
   * @param {string} data - The raw message data received from the client.
   */
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

  /**
   * Broadcasts a message to all connected WebSocket clients except the sender.
   * @param {string} message - The message to be sent to all clients.
   * @param {WebSocket} sender - The WebSocket instance of the client who sent the message.
   */
  broadcast(message, sender) {
    for (const client of this.wss.clients) {
      if (client !== sender && client.readyState === WebSocket.OPEN) {
        client.send(message)
      }
    }
  }
}
