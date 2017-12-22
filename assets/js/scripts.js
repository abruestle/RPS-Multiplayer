//pseudocode / brainstorming

	//Declare variables
	//Login/sign up ...local session to stay logged in?
	//Take variables from firebase if they are there

	//Keep track of players - firebase to link players online together



	//Chat


var database = firebase.database();
var connectionsRef= database.ref("/connections");
var connectedRef= database.ref(".info/connected");

var game = {
	//General variables (to start with) - mostly for the individual
	player: {
		//ID
		name: "",
		UID: 0,
		//All time game info
		wins: 0,
		losses: 0,
		ties: 0,
		//current game information:
		lastChat: "",
		lastChatTime: 0,
		//Initializes as not logged in (0), as initially you are not logged in
		loggedIn: 0,
	},
	enemy: {
		name: "",
		wins: 0,
		losses: 0
	},
	//Game variables
	player1: -1,
	player2: -1,
	lastChoice1: -1,
	lastChoice2: -1,
	//1 for P1 won, 2 for P2 won, 3 for tie, 0 at reset/no game going on
	currentCondition: 0,
	options: ["r", "p", "s"],
	onlinePeople: 0,
	players: 0,
	//Initialize with Firebase
	loadFirebaseGame: function(snapshot){
		//Load data from firebase
		game.player1 = snapshot.val().player1;
		game.player2 = snapshot.val().player2;
		game.lastChoice1 = snapshot.val().lastChoice1;
		game.lastChoice2 = snapshot.val().lastChoice2;
		game.currentCondition = snapshot.val().currentCondition;
		game.onlinePeople = snapshot.val().onlinePeople;
		game.players = snapshot.val().players;
		
	},
	loadFirebaseEnemy: function(snapshot) {
		//Loads name and wins/losses directly into html
		game.enemy.name = snapshot.val().name;
		game.enemy.wins = snapshot.val().wins;
		game.enemy.losses = snapshot.val().losses;
	},
	saveFirebaseGame: function() {
		database.ref().set({
			player1: game.player1,
			player2: game.player2,
	        lastChoice: game.lastChoice,
	        currentCondition: game.currentCondition,
	        onlinePeople: game.onlinePeople,
	        players: game.players
	      });
	},
	initializeFull: function(){
		//clear chat
		$("#chat dl").empty();
		$("#loginComments").text("Enter your name so you can join a game!");
		$('#chatEnter').attr('disabled', ' disabled');
		$('#joinGame').attr('disabled', ' disabled');
		game.reset();
		loadFirebaseGame();
	},
	reset: function() {
		//disable chatting, go to sign up/login/join page
		$('#actions button').attr('disabled', ' disabled');
		$("#player").html('<img alt="Player Choice" src="assets/images/player.png"><div class="caption"><h3>Player</h3><div class="progress"><div class="progress-bar progress-success" role="progressbar" id="PlayerWinsLosses" style="width:100%"></div></div></div>');
		$("#enemy").html('<img alt="Oppenent Choice" src="assets/images/player.png"><div class="caption"><h3>Player</h3><div class="progress"><div class="progress-bar progress-success" role="progressbar" id="PlayerWinsLosses" style="width:100%"></div></div></div>');

		//Goes to login tab (just in case it was the opponent who said something)
			$("#login-tab a").click();
			$(".tab-content").attr("class","tab-content");
	},
	//Sign In
	login: function() {
		//check if user is listed in database
		//if not, add them
		game.player.name = $("#user").text().trim();
		$("#loginComments").text("Hello new user, " + game.player.name + ".");
		//Adds user as a new person
		game.onlinePeople++;
		dataRef.ref().push({
	        // player.name: game.player.name,
				// name: "",
				// UID: 0,
				// //All time game info
				// wins: 0,
				// losses: 0,
				// ties: 0,
				// //current game information:
				// lastChoice: -1,
				// lastChat: "",
				// lastChatTime: 0,
				// //Initializes as not logged in (0), as initially you are not logged in
				// loggedIn: 0,
      	});
		// database.ref().set({
		// 	users: game.player1,
		// 	player2: game.player2,
	 //        lastChoice: game.lastChoice,
	 //        currentCondition: game.currentCondition,
	 //        onlinePeople: game.onlinePeople,
	 //        players: game.players
	 //      });
		
	},
	//Game
	play: function(action, person) {
		//play the game! Either player or opponent, and actually acts if both are ready
		//actions possible: ["r", "p", "s"]
		//person: 0 if player, UID if opponent
		if(person == 0) {
			//player is the one performing the action
		} else {
			//opponent is performing the action
		}
	},
	//Chat
	playerChat: function() {
		//prevent page refresh
    	event.preventDefault();
	    if(($("#chatText").val()).trim() != "") {
	        game.chat(($("#chatText").val()), game.player.name);
		}
		//Clears text if entered to chat or if just spaces/trimmed to nothing
		$("#chatText").val("");
	},
	chat: function(input, person) {
		//checks if there is any dialog
		if(input.trim() != ""){
			//checks if last person to talk was the same person or not
			if(trim($("#chat dl dt").last().text()) != person.trim()) {
				//Adds their name as a sub header for their comments
				$("#chat dl").append('<dt>'+person.trim()+'</dt>');
			}
			//Chat dialog is added from whoever said the chat
			$("#chat dl").append('<dd>  '+moment(currentTime).format("hh:mm")+'  '+input.trim()+'</dd>');

			///Goes to chat tab (just in case it was the opponent who said something)
			$("#chat-tab a").click();
			$(".tab-content").attr("class","tab-content");
		}
	},
	//saves player info (used after game results are added or on disconnect...keeps temporary variables like chat and current game option, but at disconnect and connect those are both removed (just in case))
	save: function() {
		//Firebase ^_^
		//local storage saves name and password for easier logging in
		//saves that you are logged in
		localStorage.setItem("name", game.player.name);
		localStorage.setItem("password", game.player.password);
		localStorage.setItem("UID", game.player.UID);
		game.player.loggedin = 1;
	}
	//On disconnect: you don't auto-lose (as rps doesn't need rules like that), but your data needs to be recorded and you need to be counted as offline

}

//database updates
database.ref().on("value", function(snapshot) {
  // We are now inside our .on function...

  // Console.log the "snapshot" value (a point-in-time representation of the database)
  console.log(snapshot.val());
  // This "snapshot" allows the page to get the most current values in firebase.

  game.loadFirebaseGame(snapshot);
  game.loadFirebaseEnemy(loadFirebaseEnemy);
// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});




game.initializeFull();

//Login

$("#nameEnter").on("click", function() {
	game.login();
});



$("#actions .btn").on("click", function() {
	game.chat(this.val());
});
//Player Chat events
	$(document).keypress(function(e) {
		//enter is pressed on chat
	    if(e.which == 13 &&  $( "#chat" ).is( ":visible" )) {
	    	game.playerChat();
	    }
	});

	$("#chatEnter").on("click", function() {
		game.playerChat();
	});
//Opponent Chat events
//Player does rps events
	document.onkeyup = function (event) {
		//If not in chat or signing up, this can be used for rps. Unline in the singleplayer version, I will only register normal rps keys
		if( $( "#login" ).is( ":hidden" ) && $( "#chat" ).is( ":hidden" ) && options.indexOf(event.key.toLowerCase()) != -1) {
			//then go to game with r,p, or s value
			game.play(event.key.toLowerCase(), 0);
		}
	};
	$("#actions .btn").on("click", function() {
		//gives r,p,s value to game
		game.play(this.val(), 0);
	});
//Opponent does rps events

// When the client's connection state changes...
	connectedRef.on("value", function(snap) {

	  // If they are connected..
	  if (snap.val()) {

	    // Add user to the connections list.
	    var con = connectionsRef.push(true);
	    // Remove user from the connection list when they disconnect.
	    con.onDisconnect().remove();
	  }
	});

	// When first loaded or when the connections list changes...
	connectionsRef.on("value", function(snap) {

	  // Display the viewer count in the html.
	  // The number of online users is the number of children in the connections list.
	  $("#connected-viewers").text(snap.numChildren());
	});




//previous RPS code

	// document.onkeyup = function (event) {
	//     var userChoice = options.indexOf(event.key);
	//     var compChoice = Math.floor((Math.random() * 3));
	//     if (userChoice == -1) {
	//         document.getElementById("alert").innerHTML = "Please Choose r (rock), p (paper) or s (scissor)";
	//     } else {
	//         document.getElementById("alert").innerHTML = "";
	        
	//         if (compChoice == userChoice) {
	//             tie++;
	//             currentcondition = "tie";
	//         } else if (userChoice == compChoice + 1 || userChoice == compChoice - 2){
	//             // Checks if win from being right after compChoice in array or rock/scissors win)
	//             wins++;
	//             currentcondition = "win";
	//         } else {
	//             losses++;
	//             currentcondition = "loose";
	//         }

	//     }

	//     document.getElementById("wins").innerHTML = wins;
	//     document.getElementById("losses").innerHTML = losses;
	//     document.getElementById("ties").innerHTML = tie;
	//     document.getElementById("key").innerHTML = options[userChoice];
	//     document.getElementById("compchoice").innerHTML = options[compChoice];
	//     document.getElementById("current").innerHTML = "You " + currentcondition + ".";


	//    // win condition
	//     if (currentcondition == "tie") {
	//         wincondition++;
	//     }
	//     if (losses >= wincondition) {
	//         alert("you lose");
	//     }
	//     if (wins >= wincondition) {
	//         alert("you win");
	//     }
	// }