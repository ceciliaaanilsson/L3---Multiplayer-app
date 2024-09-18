import { GameCharacter } from './GameCharacter.js'

export class GameClient {
  constructor(url, maxRetries = 5, reconnectInterval = 1000) {
    this.url = url
    this.maxRetries = maxRetries
    this.reconnectInterval = reconnectInterval
    this.connectionRetries = 0
    this.ws

    this.playerElement = document.getElementById('player')
    this.player = new GameCharacter(0, 0, 2)
    this.controllerSetup()
  }

  connect() {
    console.log('Connecting to WebSocket server...')

    this.ws = new WebSocket(this.url)

    this.ws.onopen = () => {
      console.log('Connected to WebSocket server!')
      this.connectionRetries = 0
    }

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log('Message from server:', data)
      if (data.type === 'updatePosition') {
        this.player.setPosition(data.x, data.z) // Uppdatera spelarens position
        this.playerElement.style.top = data.z + 'px'
        this.playerElement.style.left = data.x + 'px'
      }
    }

    this.ws.onclose = () => {
      console.log('Websocket connection closed:')
      this.reconnect()
    }
  }

  reconnect() {
    if (this.connectionRetries < this.maxRetries) {
      this.connectionRetries++
      const reconnectTime = this.reconnectInterval * this.connectionRetries

      setTimeout(() => {
        console.log('Trying to reconnect...')
        this.connect()
      }, reconnectTime)
    } else {
      console.log('Reached max connection attempts. Try a different network.')
    }
  }

  async controllerSetup() {
    const keysPressed = {}
    
    document.addEventListener('keydown', (e) => {
      keysPressed[e.key] = true
    })
  
    document.addEventListener('keyup', (e) => {
      keysPressed[e.key] = false
    })
  
    const updateMovement = () => {
      let dx = 0, dz = 0;
  
      if (keysPressed['w']) dz -= 1;
      if (keysPressed['s']) dz += 1;
      if (keysPressed['a']) dx -= 1;
      if (keysPressed['d']) dx += 1;
  
      if (dx !== 0 || dz !== 0) {
        this.player.move(dx, dz);
        this.sendPositionToServer();
      }
  
      requestAnimationFrame(updateMovement)
    }
  
    updateMovement()
  }

  sendPositionToServer() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const positionData = JSON.stringify({ type: 'move', x: this.player.position.x, z: this.player.position.z });
      this.ws.send(positionData);
    }
  }
}


