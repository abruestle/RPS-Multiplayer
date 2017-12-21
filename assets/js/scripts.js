//pseudocode / brainstorming

	//Declare variables
	//Login/sign up ...local session to stay logged in?
	//Take variables from firebase if they are there

	//Keep track of players - firebase to link players online together



	//Chat

var game = {
	//General variables (to start with) - mostly for the individual
	player: {
		//ID
		name: "",
		//All time game info
		wins: 0,
		losses: 0,
		ties: 0,
		//current game information:
		lastChoice: -1,
		lastChat: "",
		lastChatTime: 0,
		//Initializes as not logged in (0), as initially you are not logged in
		loggedIn: 0,
	},
	//Game variables (offline)
	lastCondition: "",
	currentcondition: "",
	options: ["r", "p", "s"],
	data: firebase.database(),
	//Initialize with Firebase
	initialize: function(){
		//clear chat
		$("#chat dl").empty();
		//check local storage for saved username/password
		//if none, disable chat, game buttons, and rps and ask for signing up or logging on
		//get from firebase database
	},
	//Sign In
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
			$("#chat dl").append('<dd>'+input.trim()+'</dd>');

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
	},
	//On disconnect: you don't auto-lose (as rps doesn't need rules like that), but your data needs to be recorded and you need to be counted as offline
	//Login error
	notLoggedIn: function() {
		//gives not logged in message; switches to right page, disables functions
	}

}




// $("body").on("click", ".char", function() {
// 	game.chooseChar($(this).attr("data-name"));

// });

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








//previous RPS code

document.onkeyup = function (event) {
    var userChoice = options.indexOf(event.key);
    var compChoice = Math.floor((Math.random() * 3));
    if (userChoice == -1) {
        document.getElementById("alert").innerHTML = "Please Choose r (rock), p (paper) or s (scissor)";
    } else {
        document.getElementById("alert").innerHTML = "";
        
        if (compChoice == userChoice) {
            tie++;
            currentcondition = "tie";
        } else if (userChoice == compChoice + 1 || userChoice == compChoice - 2){
            // Checks if win from being right after compChoice in array or rock/scissors win)
            wins++;
            currentcondition = "win";
        } else {
            losses++;
            currentcondition = "loose";
        }

    }

    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("ties").innerHTML = tie;
    document.getElementById("key").innerHTML = options[userChoice];
    document.getElementById("compchoice").innerHTML = options[compChoice];
    document.getElementById("current").innerHTML = "You " + currentcondition + ".";


   // win condition
    if (currentcondition == "tie") {
        wincondition++;
    }
    if (losses >= wincondition) {
        alert("you lose");
    }
    if (wins >= wincondition) {
        alert("you win");
    }
}