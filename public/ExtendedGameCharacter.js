import { GameCharacter } from '../Multiplayer_Module/src/GameCharacter.js'

export class ExtendedGameCharacter extends GameCharacter {
  constructor(playerId, startPosition = { x: 0, z: 0}) {
    super(playerId, startPosition)
    this.points = 0
    this.pointsElement = this.createPointsElement()
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
    imgElement.style.zIndex = '100'

    return imgElement
  }

  addPoint() {
    this.points++
    this.updatePointsDisplay()
  }

  createPointsElement() {
    const pointsElement = document.createElement('div')
    pointsElement.style.position = 'absolute'
    pointsElement.style.top = '10px'
    pointsElement.style.right = '10px'
    pointsElement.style.color = 'white'
    pointsElement.style.fontSize = '20px'
    pointsElement.style.zIndex = '200'
    pointsElement.style.padding = '20px'
    const gameElement = document.getElementById('game')

    gameElement.appendChild(pointsElement)
    return pointsElement
  }

  updatePointsDisplay() {
    this.pointsElement.innerHTML = ''
    this.pointsElement.innerText = `Points: ${this.points}`
  }

  showPlayerPoints() {
    this.updatePointsDisplay()
  }
}