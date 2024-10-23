/**
 * WebSocketManager handles the connection, reconnection, and messaging
 * for a WebSocket client.
 */
export class WebSocketManager {
  /**
   * Creates a new WebSocketManager instance.
   * @param {string} url - The WebSocket server URL to connect to.
   */
  constructor(url) {
    this.url = url
    this.maxRetries = 5
    this.reconnectInterval = 1000
    this.connectionRetries = 0
    this.onconnect = () => {}
    this.onmessage = (e) => {}

    this.ws = new WebSocket(this.url)
  }

  /**
   * Connects to the WebSocket server and sets up event listeners.
   * Listens for connection open, message, close, and error events.
   */
  connect() {
      this.ws.onopen = (e) => {
        console.log('WebSocket connection opened:', e)
        this.onconnect()
      }
    
      this.ws.onmessage = (e) => {
        this.onmessage(e)
      }
    
      this.ws.onclose = (e) => {
        console.log('WebSocket connection closed:', e)
        this.reconnect()
      }
    
      this.ws.onerror = (error) => {
        console.error('WebSocket encountered error: ', error)
      }
    }

  /**
   * Attempts to reconnect to the WebSocket server after a connection is lost.
   * The function retries the connection based on `maxRetries` and delays the retry by `reconnectInterval`.
   */
  reconnect() {
    if (this.connectionRetries < this.maxRetries) {
      this.connectionRetries++
      setTimeout(() => {
        this.connect()
      }, this.reconnectInterval * this.connectionRetries)
    } else {
      console.log('Max retries reached.')
    }
  }

  /**
   * Sends data to the WebSocket server if the connection is open.
   * @param {Object} data - The data object to send to the server, which will be serialized to JSON.
   */
  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data))
    } else {
      setTimeout (() => {
        this.send(data)
      }, 1000)
    }
  }
}
