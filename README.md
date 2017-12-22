# RPS-Multiplayer


Pseudo-code for getting it working:
-use previous RPS code for winning/losing, and apply getting the opponent's values from the database
game.loadFirebaseGame() already handles getting the data

-user data needs to be set use dataRef.ref().push and con (in the presence) to follow breadcrumbs back to how firebase sets their data. If no UID is provided, come up with a method to make one.
-after this is found, code can be copied from the loading and savinf the game functions and event handlers.

Gameplay:
-calculations for winning are done based on previous code, but for both clients. They do not have to send victory conditions to eachother, but that will be saved in firebase in case later I want to add viewers getting to see their game.
-they both appear as Player 1.
-progress bars below players appear as win/loss bars with a fraction of wins and losses while online.
-Game does not start until two players have joined, and then the button is disabled. When enabling a button, always check the number of players
-Firebase database will give opponent's choice once the opponent has selected, but player will not see it until they have selected. If the player selects first and no opponent choice is found, a 'waiting' message will appear
-pictures will change based on selection, but only once revealed for enemy. This is done with the normal .html
-win/lose message will appear based on player vs. opponent choices, and their win/loss progress bars will be updated.
-A chat message will appear to update players on who won
After a few seconds using the TimeOut funtion, the game will clear out
-after gameplay all variables are reset; buttons will re-enable after checking that there are not two players playing (just to be sure).

Chat functionality:
-needs to read from firebase all users lastChat and lastChatTime
-chat function is already working, just needs the inputs
-possibly make it so it clears out after a set limit on size.


On firebase:
Firebase stores the game information online, but they need to be set. So the game variables client-side may not be up to date.
Setting:
-database.ref().set({
			player1: game.player1,
	      });
Getting:
-game.player1 = snapshot.val().player1; where snapshot is taken from database.ref().on("value", function(snapshot)

Presence:
-My original plan was for a login, but presence counts the online users, and handles disconnects together, making it easier.
-Presence handles when players come online and off, but only if the function is loaded on and initialized before they go offline.
-In this new version with Presence, you would count as a viewer, but not a user once you come on. If you give yourself a name, buttons would be enabled and you would become a user.