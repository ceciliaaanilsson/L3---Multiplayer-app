import { GameClient } from '../../Multiplayer_Module/src/GameClient.js'
import { GameCharacter } from '../../Multiplayer_Module/src/GameCharacter.js'
import { WebSocketManager } from '../../Multiplayer_Module/src/WebSocketManager.js'

function generateUniqueId() {
  return Math.floor(10000 + Math.random() * 90000).toString()
}

document.addEventListener('DOMContentLoaded', () => {
  const gameUrl = 'ws://localhost:8080'
  const startPosition = { x: 0, z: 0 }
  const player = new GameCharacter(generateUniqueId(), startPosition)
  const gameClient = new GameClient(gameUrl)
  



  gameClient.setupWebSocket(player)
  gameClient.handleMovement(player)
})

function closeSocket(gameClient) {
const keysPressed = {}

document.addEventListener('keydown', (e) => {
  keysPressed[e.key] = true
})

if (keysPressed['p']) gameClient.close()
}
