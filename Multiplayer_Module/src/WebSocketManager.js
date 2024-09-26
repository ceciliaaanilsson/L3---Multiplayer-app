export class WebSocketManager {

    constructor(url, maxRetries = 5, reconnectInterval = 1000) {
      this.url = url
      this.maxRetries = maxRetries
      this.reconnectInterval = reconnectInterval
      this.connectionRetries = 0
      this.onconnect = () => {}
      this.onmessage = (e) => {}
      this.onclose = (e) => {}

      this.ws = new WebSocket(this.url)
    }
  
    connect() {
        this.ws.onopen = (e) => {
          console.log('WebSocket connection opened:', e)
        }
      
        this.ws.onmessage = (e) => {
            this.onmessage(e)
        }
      
        this.ws.onclose = (e) => {
          console.log('WebSocket connection closed:', e)
          this.reconnect(e)
        }
      
        this.ws.onerror = (error) => {
          console.error('WebSocket encountered error: ', error)
        }
        this.onconnect()
      }
  
    reconnect(e) {
      if (this.connectionRetries < this.maxRetries) {
        this.connectionRetries++
        setTimeout(() => {
          this.connect()
        }, this.reconnectInterval * this.connectionRetries)
      } else {
        console.log('Max retries reached.')
        this.onclose(e)
      }
    }
  
    send(data) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify(data))
      }
    }
  
    close() {
      if (this.ws) {
        this.ws.close()
      }
    }
  }