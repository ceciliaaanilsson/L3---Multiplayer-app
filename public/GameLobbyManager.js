import { GameLobby } from "./GameLobby.js";

export class GameLobbyManager {
  constructor() {
    this.lobbies = {}
  }

  createLobby() {
    const lobbyId = Math.random().toString(36).substring(7)
    this.lobbies[lobbyId] = new GameLobby(lobbyId)
    return this.lobbies[lobbyId]
  }

  addPlayerToLobby(lobbyId, player) {
    const lobby = this.lobbies[lobbyId]
    lobby.addPlayer(player)
  }

  getLobby(lobbyId) {
    return this.lobbies[lobbyId]
  }

  getLobbies() {
    return this.lobbies
  }
}