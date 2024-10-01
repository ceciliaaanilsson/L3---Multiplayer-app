import { GameClient } from '../../Multiplayer_Module/src/GameClient.js'
import { GameCharacter } from '../../Multiplayer_Module/src/GameCharacter.js'
import { WebSocketManager } from '../../Multiplayer_Module/src/WebSocketManager.js'
import { CustomGameCharacter } from './CustomGameCharacter.js'

function generateId() {
  return Math.floor(10000 + Math.random() * 90000).toString()
}

document.addEventListener('DOMContentLoaded', () => {
  const gameUrl = 'ws://localhost:8080'
  const startPosition = { x: 0, z: 0 }
  const player = new CustomGameCharacter(generateId(), startPosition)
  const gameClient = new GameClient(gameUrl, CustomGameCharacter)
  console.log(player)
  



  gameClient.setupWebSocket(player)
  gameClient.handleMovement(player)
})
