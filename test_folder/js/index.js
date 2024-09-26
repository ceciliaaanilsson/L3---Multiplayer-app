import { GameClient } from '../../Multiplayer_Module/src/GameClient.js'
import { GameCharacter } from '../../Multiplayer_Module/src/GameCharacter.js'

function generateUniqueId() {
  return Math.floor(10000 + Math.random() * 90000).toString()
}

document.addEventListener('DOMContentLoaded', () => {
  const gameUrl = 'ws://localhost:8080'
  const gameClient = new GameClient(gameUrl)
  

  const startPosition = { x: 0, z: 0 }
  const player = new GameCharacter(generateUniqueId(), startPosition)

  gameClient.setupWebSocket(player)
  gameClient.handleMovement(player)
})