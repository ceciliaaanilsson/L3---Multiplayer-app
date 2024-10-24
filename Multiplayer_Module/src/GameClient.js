import { WebSocketManager } from './WebSocketManager.js'
import { GameCharacter } from './GameCharacter.js'

export class GameClient {
  /**
   * Represents a client in the multiplayer game, responsible for managing players and WebSocket connections.
   *
   * @class
   * @param {string} url - The URL of the WebSocket server to connect to.
   * @param {function} characterClass - The class used to create player characters, defaults to GameCharacter.
   */
  constructor(url, characterClass = GameCharacter) {
    this.players = {}
    this.scale = 1
    this.wsManager = new WebSocketManager(url)
    this.characterClass = characterClass
  }

  getPlayers() {
    return this.players
  }

  addPlayer(player) {
    this.players[player.playerId] = player
    player.updateElementPosition(this.scale)
  }

  /**
   * Sets up the WebSocket connection for the player and sends initial data to the server.
   * @param {GameCharacter} player - The player initiating the WebSocket connection.
   * @returns {Promise<void>}
   */
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

  /**
   * Handles incoming WebSocket messages and updates players' positions or removes players.
   * @param {MessageEvent} event - The message event containing data from the server.
   * @returns {Promise<void>}
   */
  async handleMessage(event) {
    const data = JSON.parse(event.data)
    console.log('Data received from server:', data)

    if (data.type === 'initialPositions') {
      Object.keys(data.players).forEach(playerId => {
        const playerData = data.players[playerId]

        if (!this.players[playerId]) {
          const newPlayer = new this.characterClass(playerId, { x: playerData.x, z: playerData.z })
          this.addPlayer(newPlayer)
        }

        this.players[playerId].setPosition(playerData.x, playerData.z)
        this.players[playerId].updateElementPosition(this.scale)
      })
    } else if (data.type === 'updatePosition') {
      let player = this.players[data.playerId]

      if (!player) {
        player = new this.characterClass(data.playerId, { x: data.x, z: data.z })
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

  removePlayer(playerId) {
    const player = this.players[playerId]
    if (player) {
      if (player.element) {
        player.element.remove()
      }
      delete this.players[playerId]
    }
  }

  /**
   * Handles keyboard input and updates player movement accordingly.
   * Sends movement data to the server when the player moves.
   * 
   * - W: Move forward
   * - S: Move backward
   * - A: Move left
   * - D: Move right
   * 
   * @param {GameCharacter} player - The player whose movement is controlled.
   */
  handleMovement(player) {
    const keysPressed = {}

    document.addEventListener('keydown', (e) => {
      keysPressed[e.key] = true
    })

    document.addEventListener('keyup', (e) => {
      keysPressed[e.key] = false
    })

    this.eachFrame(0, player, keysPressed)
  }

  eachFrame (timeStamp, player, keysPressed) {
    this.updateMovement(player, keysPressed)
    requestAnimationFrame((time) => {this.eachFrame(time, player, keysPressed)})
  }

  updateMovement (player, keysPressed) {
    let dx = 0, dz = 0;

    if (keysPressed['w']) dz -= 5
    if (keysPressed['s']) dz += 5
    if (keysPressed['a']) dx -= 5
    if (keysPressed['d']) dx += 5

    if (dx !== 0 || dz !== 0) {
      const newPositionX = player.position.x + dx
      const newPositionz = player.position.z + dz
      
      if (!(newPositionX > 1270 || newPositionX < 0 || newPositionz > 1165 || newPositionz < 0)) {
        player.move(dx, dz)
        player.updateElementPosition()
        this.wsManager.send({
          type: 'move',
          playerId: player.playerId,
          x: player.position.x,
          z: player.position.z
        })
      }
    }
  }
}
