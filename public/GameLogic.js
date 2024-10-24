import { ExtendedGameClient } from './ExtendedGameClient.js'
import { ExtendedGameCharacter } from './ExtendedGameCharacter.js'
import { GameLobbyManager } from './GameLobbyManager.js'
import { FlowerSpawner } from './FlowerSpawner.js'

export class GameLogic {
  constructor() {
    this.connectPlayer()
    this.lobbyManager = new GameLobbyManager()
    this.flowerSpawner = new FlowerSpawner()
    this.url = 'ws://localhost:8080'
  }

  connectPlayer() {
    document.addEventListener('DOMContentLoaded', () => {
      const player = new ExtendedGameCharacter(this.generateUniqueId())
      const gameClient = new ExtendedGameClient(this.url, ExtendedGameCharacter)
    
      gameClient.setupWebSocket(player)
      gameClient.handleMovement(player)
      this.findLobby(player, gameClient)
    })
  }

  generateUniqueId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  findLobby(player, gameClient) {
    const lobbies = this.lobbyManager.getLobbies()
    let targetLobby = this.searchAvailableLobbies(lobbies)
    
    if (!targetLobby) {
      targetLobby = this.lobbyManager.createLobby()
    }
  
    this.lobbyManager.addPlayerToLobby(targetLobby.lobbyId, player)

    gameClient.sendCustomMessage({
      type: 'playerAddedToLobby',
      lobbyId: targetLobby.lobbyId,
      playerId: player.playerId
    })
  }
  
  searchAvailableLobbies(lobbies) {
    for (let lobbyId in lobbies) {
      const lobby = lobbies[lobbyId]
      if (!lobby.isLobbyFull()) {
        return lobby
      }
    }
    return null
  }


}