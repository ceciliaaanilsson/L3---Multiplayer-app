import { WebSocketManager } from './WebSocketManager.js'
import { GameCharacter } from './GameCharacter.js'

export class GameClient {
  constructor(url, maxRetries = 5, reconnectInterval = 1000) {
    this.players = {}
    this.scale = 10
    this.wsManager = new WebSocketManager(url, maxRetries, reconnectInterval)
  }

  addPlayer(player) {
    this.players[player.playerId] = player
  }

  async setupWebSocket(player) {
    this.addPlayer(player)

    this.wsManager.onconnect = 
      () => {
        console.log('Connected to WebSocket server!')
        this.wsManager.send({
          type: 'newPlayer',
          playerId: player.playerId,
          x: player.position.x,
          z: player.position.z
        })
      }

    this.wsManager.onmessage = this.handleMessage.bind(this)

    this.wsManager.connect()
  }

  async handleMessage(event) {
    const data = JSON.parse(event.data)
    console.log('Data received from server:', data)
  
    if (data.type === 'initialPositions') {
      Object.keys(data.players).forEach(playerId => {
        const playerData = data.players[playerId]
  
        if (!this.players[playerId]) {
          const newPlayer = new GameCharacter(playerId, { x: playerData.x, z: playerData.z }, 'blue')
          this.addPlayer(newPlayer)
        }
  
        this.players[playerId].setPosition(playerData.x, playerData.z)
        this.players[playerId].updateElementPosition(this.scale)
      })
    } else if (data.type === 'updatePosition') {
      let player = this.players[data.playerId]
  
      if (!player) {
        player = new GameCharacter(data.playerId, { x: data.x, z: data.z }, 'blue')
        this.addPlayer(player)
      }

      player.setPosition(data.x, data.z)
      player.updateElementPosition(this.scale)
    } else if (data.type === 'playerDisconnected') {
      this.removePlayer(data.playerId)
    } else {
      throw new Error('Unknown message type: ', data.type)
    }
  }

  removePlayer (playerId) {
    const player = this.players[playerId]
    if (player) {
      if (player.element) {
        player.element.remove()
      }
      delete this.players[playerId]
    }
  }

  handleMovement(player) {
    const keysPressed = {}

    document.addEventListener('keydown', (e) => {
      keysPressed[e.key] = true
    })

    document.addEventListener('keyup', (e) => {
      keysPressed[e.key] = false
    })

    const updateMovement = () => {
      let dx = 0, dz = 0;

      if (keysPressed['w']) dz -= 1
      if (keysPressed['s']) dz += 1
      if (keysPressed['a']) dx -= 1
      if (keysPressed['d']) dx += 1

      if (dx !== 0 || dz !== 0) {
        player.move(dx, dz)
        player.updateElementPosition(this.scale)
        this.wsManager.send({
          type: 'move',
          playerId: player.playerId,
          x: player.position.x,
          z: player.position.z
        })
      }

      requestAnimationFrame(updateMovement)
    }

    updateMovement()
  }
}
