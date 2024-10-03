import { GameClient } from '../../Multiplayer_Module/src/GameClient.js'
import { GameCharacter } from '../../Multiplayer_Module/src/GameCharacter.js'
import { WebSocketManager } from '../../Multiplayer_Module/src/WebSocketManager.js'
import { CustomGameCharacter } from './CustomGameCharacter.js'

function generateId() {
  return Math.floor(10000 + Math.random() * 90000).toString()
}

document.addEventListener('DOMContentLoaded', () => {
  const gameUrl = 'ws://localhost:8080'
  const startPosition = { x: 10, z: 10 }
  const player = new GameCharacter(generateId(), startPosition)
  const gameClient = new GameClient(gameUrl, GameCharacter)

  const player2 = new GameCharacter(generateId(), { x: 20, z: 20 })
  gameClient.addPlayer(player2)

  setTimeout(() => {
    gameClient.removePlayer(player2.playerId)
  }, 3000)

  const players = gameClient.getPlayers()
  console.log(players)

  gameClient.setupWebSocket(player)
  gameClient.handleMovement(player)
})
