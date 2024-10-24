export class GameLobby {
  
  constructor(lobbyId, flowerData) {
  this.lobbyId = lobbyId
  this.players = {}
  this.maxPlayers = 18
  this.flowerData = flowerData
  }

  addPlayer(player) {
    if (!this.isLobbyFull()) {
      this.players[player.playerId] = player
    }
  }

  startGame() {
    return this.isLobbyFull()
  }

  isLobbyFull() {
    return this.getPlayerCount() >= this.maxPlayers
  }

  getPlayerCount() {
    return Object.keys(this.players).length
  }
}