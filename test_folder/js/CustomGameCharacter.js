import { GameCharacter } from '../../Multiplayer_Module/src/GameCharacter.js'

export class CustomGameCharacter extends GameCharacter {
    constructor(playerId, startPosition = { x: 0, z: 0 }, elementColor = 'blue') {
        super(playerId, startPosition, elementColor)
      }

      createPlayerElement(color) {
        const element = document.createElement('div')
        element.classList.add('player')
        element.style.position = 'absolute'
        element.style.width = '50px'
        element.style.height = '50px'
        element.style.backgroundColor = color
        document.getElementById('game-container').appendChild(element)
        return element
      }
}