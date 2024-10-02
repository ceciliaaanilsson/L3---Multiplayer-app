/**
 * Represents the modules GameCharacter object.
 */
export class GameCharacter {
  /**
   * Represents a game character in the multiplayer game.
   * 
   * @class
   * @param {string} playerId - The unique identifier for the player.
   * @param {Object} startPosition - The initial position of the character, containing x and z coordinates.
   * @param {string} elementColor - The color of the character's element in the game UI.
   */
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

  /**
   * Moves the character by updating its position based on the change in x and z coordinates.
   * 
   * @param {number} dx - The change in the x-coordinate (horizontal movement).
   * @param {number} dz - The change in the z-coordinate (vertical movement).
   */
  move(dx, dz) {
    this.position.x += dx
    this.position.z += dz
  }

  /**
   * Updates the character's visual position on the screen by applying scaling to the position 
   * and setting the corresponding CSS styles for the element's left and top properties.
   * 
   * @param {number} scale - The scaling factor used to adjust the position of the character's element.
   */
  updateElementPosition(scale) {
    this.element.style.left = `${this.position.x * scale}px`
    this.element.style.top = `${this.position.z * scale}px`
  }
}