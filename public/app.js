import { GameClient } from '../Multiplayer_Module/src/GameClient.js'
import { ExtendedGameCharacter } from './ExtendedGameCharacter.js'

function generateId() {
  return Math.floor(10000 + Math.random() * 90000).toString()
}

document.addEventListener('DOMContentLoaded', () => {
  const gameUrl = 'ws://localhost:8080'
  const player = new ExtendedGameCharacter(generateId())
  const gameClient = new GameClient(gameUrl, ExtendedGameCharacter)
  console.log(player)


  const players = gameClient.getPlayers()
  console.log(players)

  gameClient.setupWebSocket(player)
  gameClient.handleMovement(player)
})


