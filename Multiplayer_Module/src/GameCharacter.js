export class GameCharacter {
  constructor (x = 0, z = 0, speed = 1) {
    this.position = { x, z }
    this.speed = speed

    this.setPosition(x, z)
  }

  async move (dx, dz) {
    this.position.x += dx * this.speed
    this.position.z += dz * this.speed
  }

  async getPosition () {
    return this.position
  }

  setPosition (x, z) {
    this.position.x = x
    this.position.z = z
  }
}