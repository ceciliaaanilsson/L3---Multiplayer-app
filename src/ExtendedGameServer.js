import { GameServer } from '../Multiplayer_Module/src/GameServer.js'
import { FlowerGenerator } from './FlowerGenerator.js'

export class ExtendedGameServer extends GameServer {
  constructor(port) {
    super(port)
    this.flowers = {}
    this.flowerGenerator = new FlowerGenerator(60)
    // this.startFlowerGenerationInterval()
  }

  /**
   * Handles incoming messages from clients. It processes different message types.
   * @param {WebSocket} ws - The WebSocket instance for the connected client.
   * @param {string} data - The raw message data received from the client.
   */
  handleMessageType(ws, data) {
    super.handleMessageType(ws, data)
    const message = JSON.parse(data)

    if (message.type === 'flowerSpawned') {
      this.messageTypeFlowerSpawned(message)
    }
    if (message.type === 'removeFlower') {
      this.messageTypeRemoveFlower(message)
    }
  }

  messageTypeFlowerSpawned(message) {
    this.flowers[message.flowerId]

    this.broadcast(JSON.stringify({
      type: 'flowerSpawned',
      data: message.flower,
      flowerId: message.flowerId
    }))
  }

  messageTypeRemoveFlower(message) {
    delete this.flowers[message.flowerId]

    this.broadcast(JSON.stringify({
      type: 'removeFlower',
      flowerId: message.flowerId
    }))
  }

  handleConnections(ws) {
    super.handleConnections(ws)
    const flowerData = this.flowerGenerator.getFlowerData()

    ws.send(JSON.stringify({
      type: 'spawnFlowers',
      data: flowerData
    }))
  }

  startFlowerGenerationInterval() {
    setInterval(() => {
      const flowerGenerator = new FlowerGenerator(60)
      const flowerData = flowerGenerator.getFlowerData()

        this.broadcast(JSON.stringify({
          type: 'spawnFlowers',
          data: flowerData
        }))

    }, 22000)
  }
}
