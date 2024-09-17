class GameClient {
  constructor(url, maxRetries = 5, reconnectInterval = 1000) {
    this.url = url
    this.maxRetries = maxRetries
    this.reconnectInterval = reconnectInterval
    this.connectionRetries = 0
    this.ws
  }

  connect() {
    console.log('Connecting to WebSocket server...')

    this.ws = new WebSocket(this.url)

    this.ws.onopen = () => {
      console.log('Connected to WebSocket server!')
      this.connectionRetries = 0
    }
  }

  reconnect() {
    if (this.connectionRetries < this.maxRetries) {
      this.connectionRetries++
      this.connect()

      setTimeout(() => {
        console.log('Trying to reconnect...')
        this.connect()
      }, reconnectTime)
    } else {
      console.log('Reached max connection attempts. Try a different network.')
    }
  }
}

new GameClient('ws://localhost:8080').connect()
