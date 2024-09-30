export class GameCharacter {
  constructor(playerId, startPosition = { x: 0, z: 0 }, elementColor = 'blue') {
    this.playerId = playerId
    this.position = startPosition
    this.element = this.createPlayerElement(elementColor)
  }

  createPlayerElement(color) {
    const element = document.createElement('div')
    element.classList.add('player')
    element.style.position = 'absolute'
    element.style.width = '50px'
    element.style.height = '50px'
    element.style.backgroundColor = color
    element.style.borderRadius = '50%'
    document.getElementById('game-container').appendChild(element)
    return element
  }

  setPosition(x, z) {
    this.position.x = x
    this.position.z = z
  }

  move(dx, dz) {
    this.position.x += dx
    this.position.z += dz
  }

  updateElementPosition(scale) {
    this.element.style.left = `${this.position.x * scale}px`
    this.element.style.top = `${this.position.z * scale}px`
  }
}