import { GameCharacter } from '../Multiplayer_Module/src/GameCharacter.js'

export class ExtendedGameCharacter extends GameCharacter {
  constructor(playerId, startPosition = { x: 0, z: 0}) {
    super(playerId, startPosition)
  }

  createPlayerElement() {
    const playerElement = document.createElement('div')
    playerElement.style.position = 'absolute'
    const characterImage = this.createPlayerImage()
    playerElement.style.backgroundRepeat = 'no-repeat'
    playerElement.appendChild(characterImage)
    document.getElementById('game-container').appendChild(playerElement)
    
    return playerElement
  }

  createPlayerImage() {
    const imgElement = document.createElement('img')
    imgElement.src = '../img/game_character_l3.png'
    imgElement.alt = 'Player Image'
    imgElement.style.width = '50px'
    imgElement.style.height = '50px'

    return imgElement
  }
}