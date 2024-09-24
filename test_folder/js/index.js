import { GameClient } from "../../Multiplayer_Module/src/GameClient.js"

const game = new GameClient('ws://localhost:8080')

  function generateRandomId() {
    return Math.floor(10000 + Math.random() * 90000).toString()
  }
    

  function createPlayer() {
    const playerId = generateRandomId();  // Generera ett unikt ID för varje spelare
    const element = document.createElement('div');
    element.classList.add('player');
    element.style.position = 'absolute';
    element.style.width = '50px';
    element.style.height = '50px';
    element.style.backgroundColor = 'blue';
    document.getElementById('game-container').appendChild(element);  // Lägg till elementet i DOM
  
    const player = {
      playerId: playerId,  // Tilldela ID till spelare
      position: { x: 0, z: 0 },
      element: element,
      move(dx, dz) {
        this.position.x += dx;
        this.position.z += dz;
      },
      setPosition(x, z) {
        this.position.x = x;
        this.position.z = z;
      }
    };
  
    return player;
  }

const player = createPlayer()

game.setupWebSocket(player)  
game.handleMovement(player)
