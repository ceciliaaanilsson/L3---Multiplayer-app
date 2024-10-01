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
```