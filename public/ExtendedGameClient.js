import { GameClient } from '../Multiplayer_Module/src/GameClient.js'
import { FlowerSpawner } from './FlowerSpawner.js'

export class ExtendedGameClient extends GameClient {
  constructor(url, characterClass) {
    super(url, characterClass)
    this.flowerSpawner = new FlowerSpawner()
    this.flowers = {}
  }

  sendCustomMessage(data) {
    this.wsManager.send(data)
  }

  async handleMessage(event) {
    const data = JSON.parse(event.data)
    console.log('Data received from server:', data)
  
    if (data.type === 'initialPositions') {
      this.dataTypeInitialPositions(data)
    } else if (data.type === 'updatePosition') {
      this.dataTypeUpdatePosition(data)
    } else if (data.type === 'playerDisconnected') {
      this.removePlayer(data.playerId)
    } else if (data.type === 'spawnFlowers') {
      this.#spawnFlowers(data.data)
    } else if (data.type === 'removeFlower') {
      this.#removeFlower(data.flowerId)
    } else {
      throw new Error('Unknown message type: ', data.type)
    }
  }

  #spawnFlowers(flowerData, flowerId) {
    this.flowerSpawner.placeAllFlowers(flowerData, flowerId)
    this.flowers = { ...this.flowers, ...flowerData }
  }

  updateMovement(player, keysPressed) {
    super.updateMovement(player, keysPressed)
    this.#checkCollision(player)
  }

  /**
   * Checks if the player colide with a flower.
   * 
   * @param {object} player - The player object
   */
  #checkCollision(player) {
    for (const flowerId of Object.keys(this.flowers)) {
      const flower = this.flowers[flowerId]
      const flowerX = parseFloat(flower.x)
      const flowerZ = parseFloat(flower.z)

      const dx = player.position.x - flowerX
      const dz = player.position.z - flowerZ
      const distance = Math.sqrt(dx * dx + dz * dz)
      if (distance < 50) {
        player.addPoint()
        this.sendCustomMessage({ 
          type: 'removeFlower',
          flowerId: flowerId
        })
      }
    }
  }

  #removeFlower(flowerId) {
    const flower = document.getElementById(flowerId)
    flower.remove()
    delete this.flowers[flowerId]
  }
}