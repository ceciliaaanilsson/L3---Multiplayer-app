## Test Specification

### Manual testing

### Test eviroment
- The tests are performed on a MacBook Air M1 (2020), macOS v.15.0.1

- Browser: Mozilla Firefox

## Test cases

### Test case 1: Player movement

1.1: The player moves down when "s"-key is pressed.

Steps:

1. Start the game
2. Press the "s" key

Expected: The player moves down.

1.2: The player moves up when "w"-key is pressed.

Steps:

1. Start the game
2. Press the "w" key

Expected: The player moves up.

1.3: The player moves left when "a"-key is pressed.

Steps:

1. Start the game
2. Press the "a" key

Expected: The player moves left.

1.4: The player moves right when "d"-key is pressed.

Steps:

1. Start the game
2. Press the "d" key

Expected: The player moves right.

### Test case 2: Players should interact realtime

2.1: Two clients starts the game and move.

Steps:

1. Two clients starts the game.
2. One presses a,w,s or d to move.

Expected: The other client watches the player move in realtime.

### Test case 3: Flowers should be removed when a player is close

3.1: A client moves close to a flower and the flower disapears.

Steps:

1. Start the game.
2. The player moves close to a flower.

Expected: The flower disapears.

### Test case 4: The app should count points for each picked flower

4.1: When a client picks a flower, they should earn a point.

Steps:

1. Start the game.
2. The player moves close to a flower.

Expected: The player earns a point.
