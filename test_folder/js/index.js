import { GameClient } from "../../Multiplayer_Module/src/GameClient.js"

const game = new GameClient('ws://localhost:8080')

game.connect()
