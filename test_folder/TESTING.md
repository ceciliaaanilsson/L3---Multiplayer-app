# Testing

### Overview

This test report covers the testing of the Multiplayer Module that integrates different components such as GameClient, GameCharacter, WebSocketManager. The test is intended to check the functionality of adding, removing, and managing players, along with WebSocket setup and movement handling.

### Test coverage

All public methods in the classes is tested.

### Test Procedure

	1.	Document Event Listener (DOMContentLoaded): Ensures that the game logic executes once the DOM is fully loaded.
	2.	Player Creation:
	•	A player instance (player) is created using CustomGameCharacter with a random ID and specified starting position (x: 10, z: 10).
	•	A second player (player2) is also created and added to the game client.
	3.	Player Removal: After 3 seconds, player2 is removed from the game to verify the removal functionality.
	4.	WebSocket Setup: A WebSocket connection is set up for the main player using gameClient.setupWebSocket().
	5.	Movement Handling: The handleMovement() method of gameClient is tested for basic movement handling logic.
	6.	Players Retrieval: The current list of players is retrieved and logged to the console using gameClient.getPlayers().

### Test Output

	•	Console Output:
	•	The console.log(players) shows the list of players currently added to the game.
	•	Player 2 is successfully removed after 3 seconds, and the updated player list reflects this change.
	•	Player Management:
	•	Player Addition: player2 is successfully added with a unique ID and starting position {x: 20, z: 20}.
	•	WebSocket Setup: WebSocket is initialized for the main player (player) without any errors. The WebSocket connection is expected to handle further multiplayer communication (although it’s not tested for complex data transfer in this instance).
	•	Movement Handling: The movement handling for the player is initiated using gameClient.handleMovement(). This method worked without throwing any exceptions, though further verification would be needed to ensure proper movement synchronization.