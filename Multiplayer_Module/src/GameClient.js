export class GameClient {
  constructor(url, maxRetries = 5, reconnectInterval = 1000) {
    this.url = url
    this.maxRetries = maxRetries
    this.reconnectInterval = reconnectInterval
    this.connectionRetries = 0
    this.ws

    this.scale = 10
  }

  setupWebSocket() {
    console.log('Connecting to WebSocket server...')
    this.ws = new WebSocket(this.url)
    
    this.ws.onopen = () => {
      console.log('Connected to WebSocket server!')
      this.connectionRetries = 0
    }

    this.ws.onmessage = this.handleMessage.bind(this)
    this.ws.onclose = () => {
      console.log('Websocket connection closed:')
      this.reconnect()
    }
  }

  handleMessage(event) {
    const data = JSON.parse(event.data)
    console.log('Message from server:', data)
    if (data.type === 'updatePosition') {
      this.updatePlayerPositionOnScreen(data.x, data.z)
    }
  }

  reconnect() {
    if (this.connectionRetries < this.maxRetries) {
      this.connectionRetries++
      const reconnectTime = this.reconnectInterval * this.connectionRetries

      setTimeout(() => {
        console.log('Trying to reconnect...')
        this.setupWebSocket()
      }, reconnectTime)
    } else {
      console.log('Reached max connection attempts. Try a different network.')
    }
  }

  disconnectWebsocket() {
    if (this.ws) {
      this.ws.close()
      console.log('Disconnected from Websocket.')
    }
  }

  handleMovement(player) {
    const keysPressed = {}
    
    document.addEventListener('keydown', (e) => {
      keysPressed[e.key] = true
    });

    document.addEventListener('keyup', (e) => {
      keysPressed[e.key] = false
    });

    const updateMovement = () => {
      let dx = 0, dz = 0
    
      if (keysPressed['w']) dz -= 1
      if (keysPressed['s']) dz += 1
      if (keysPressed['a']) dx -= 1
      if (keysPressed['d']) dx += 1
    
      if (dx !== 0 || dz !== 0) {
        player.move(dx, dz)
        this.updatePlayerPositionOnScreen(player, player.position.x, player.position.z)
        this.sendPositionToServer(player)
      }
    
      requestAnimationFrame(updateMovement)
    }
    
    updateMovement()
  }

  updatePlayerPositionOnScreen(player, x, z) {
    player.element.style.left = `${x * this.scale}px`
    player.element.style.top = `${z * this.scale}px`
  }

  sendPositionToServer(player) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const positionData = JSON.stringify({
        type: 'move',
        x: player.position.x,
        z: player.position.z
      })
      this.ws.send(positionData)
    }
  }
}
