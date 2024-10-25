import { ExtendedGameClient } from './ExtendedGameClient.js'
import { ExtendedGameCharacter } from './ExtendedGameCharacter.js'
import { FlowerSpawner } from './FlowerSpawner.js'

export class GameLogic {

  constructor() {
    this.connectPlayer()
    this.flowerSpawner = new FlowerSpawner()
    this.url = 'ws://localhost:8080'
  }

  connectPlayer() {
    document.addEventListener('DOMContentLoaded', () => {
      const player = new ExtendedGameCharacter(this.generateUniqueId())
      const gameClient = new ExtendedGameClient(this.url, ExtendedGameCharacter)
    
      gameClient.setupWebSocket(player)
      gameClient.handleMovement(player)
    })
  }

  generateUniqueId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }
}