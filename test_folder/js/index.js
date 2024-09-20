import { GameClient } from "../../Multiplayer_Module/src/GameClient.js"

const game = new GameClient('ws://localhost:8080')

game.setupWebSocket()


const player = {
    position: { x: 0, z: 0 },
    element: document.getElementById('player'),
    move(dx, dz) {
      this.position.x += dx
      this.position.z += dz
    },
    setPosition(x, z) {
      this.position.x = x
      this.position.z = z
    }
  };
  
game.handleMovement(player)