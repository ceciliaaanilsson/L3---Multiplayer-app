import { GameClient } from '../Multiplayer_Module/src/GameClient.js'

export class ExtendedGameClient extends GameClient {
  constructor(url, characterClass) {
    super(url, characterClass)
  }

  sendCustomMessage(data) {
    this.wsManager.send(data)
  }
}