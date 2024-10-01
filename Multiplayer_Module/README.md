# WebSocket Game Client and Server

A simple WebSocket-based game server and client where players can connect, move around in a 2D world, and see other players' movements in real-time.

## Features
- Real-time player position updates using WebSockets.
- Support for multiple players to connect and interact.
- Server manages connections, disconnections, and position updates.
- Players can move around the game world using the keyboard (W, A, S, D).
- Utilizes WebSockets for fast communication between the client and server.

## Important
The classes in this module are designed to be extended, allowing users to add more functionality to the game beyond basic movement. Users can customize and expand the game by designing their own game characters and incorporating additional gameplay mechanics.


## Dependencies

The project has the following dependency:

- **[ws](https://www.npmjs.com/package/ws)**: A simple WebSocket library for Node.js:
  ```bash
  npm install ws
  ```

  

## Installation
  ```bash
  npm install @cissi/multiplayer-socket
  ```

## Usage
1. Install the module as described.
2. Import the classes as needed.
3. Use the methods provided by each class.

## Servercode
```javascript
import { GameServer } from '@cissi/multiplayer-socket'

// Sets up a new WebSocket server and takes the port as argument.

new GameServer(port)
```

## Clientcode

```javascript
import { WebSocketManager, GameClient, GameCharacter } from '@cissi/multiplayer-socket'

// Define the player's start position
const startPosition = { x: 0, z: 0 }

// Assign a unique Player ID (you may want to fetch or generate this dynamically)
const playerId = 'player_123'

// Create a new game character instance
const player = new GameCharacter(playerId, startPosition)

// Define the WebSocket server URL
const gameUrl = 'ws://localhost:8080'

// Create a new GameClient instance
// Optional: Extend GameCharacter if needed and pass it as a second argument
const gameClient = new GameClient(gameUrl)

gameClient.getPlayers() // Returns a list of player objects.

gameClient.addPlayer(player) // Adds a player to the list and takes a player object as argument.

gameClient.removePlayer(playerId) // Takes a playerId as argument and removes the player with the id from the list.


gameClient.setupWebSocket(player)// Connect the player to the WebSocket server.


gameClient.handleMovement(player)// Handle player movement using keyboard controls (W, A, S, D).
```