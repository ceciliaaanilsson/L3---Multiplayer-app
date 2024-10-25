Test Specification

Manual testing

Test environment

	•	The tests are performed on a MacBook Air M1 (2020), macOS v.15.0.1
	•	Browser: Mozilla Firefox

Test cases

Test case 1: WebSocket connection setup

1.1: The WebSocket connection should initialize correctly with the game URL.

Steps:

	1.	Initialize GameClient with gameUrl (ws://localhost:8080).
	2.	Call gameClient.setupWebSocket(player).

Expected: The WebSocket connection opens successfully with ws://localhost:8080 and the player is added to the game.

Test case 2: Adding a player to the game

2.1: A new player should be added successfully.

Steps:

	1.	Create a new player instance with position { x: 20, z: 20 }.
	2.	Call gameClient.addPlayer(player2).

Expected: Player2 is added to the game and appears in the list of players.

Test case 3: Removing a player from the game

3.1: A player should be removed after a 3-second delay.

Steps:

	1.	Add player2 to gameClient.
	2.	Wait for 3 seconds.
	3.	Verify player2’s removal by calling gameClient.getPlayers().

Expected: Player2 is removed from the game after 3 seconds.

Test case 4: Retrieve all players

4.1: The getPlayers() function should return the correct list of players.

Steps:

	1.	Add player2 to gameClient.
	2.	Call gameClient.getPlayers().

Expected: The list of players includes both player and player2.

Test case 5: Player movement handling

5.1: The handleMovement() function should correctly update player movement.

Steps:

	1.	Set up WebSocket connection with gameClient.setupWebSocket(player).
	2.	Call gameClient.handleMovement(player) and press movement keys.

Expected: The player position updates correctly in response to movement key inputs (W, A, S, D).