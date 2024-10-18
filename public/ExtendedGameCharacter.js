import { GameCharacter } from '../Multiplayer_Module/src/GameCharacter'

class ExtendedGameCharacter extends GameCharacter {
  constructor(playerId, startPosition = { x: 0, z: 0}) {
    super(playerId, startPosition)
  }

  createPlayerElement() {
    const playerElement = document.createElement('div')
    
  }
}