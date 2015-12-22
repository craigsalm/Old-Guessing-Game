 //**** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess;
var winningNumber;
var guessedNumbers = [];
var guessCount = 0;



/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor((Math.random() * 100) + 1)
}

// Fetch the Players Guess
function playersGuessSubmission(){
	playersGuess = Number($('#input').val());
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	if (playersGuess > winningNumber){
		if (1 <= (playersGuess - winningNumber) && (playersGuess - winningNumber) < 33) {return("You're close though. Your number is too high by less than 33 numbers!")}
		else if (33 <= (playersGuess - winningNumber) && (playersGuess - winningNumber) < 66) {return("Getting closer though. Your number is too high by less than 66 numbers!")}
		else if (66 <= (playersGuess - winningNumber) && (playersGuess - winningNumber) <= 99) {return("Keeping trying though. Your number is too high by more than 65 numbers!")}
	}
	if (winningNumber > playersGuess){
		if (1 <= (winningNumber - playersGuess) && (winningNumber - playersGuess) < 33) {return("You're close though. Your number is too low by less than 33 numbers!")}
		else if (33 <= (winningNumber - playersGuess) && (winningNumber - playersGuess) < 66) {return("Getting closer though. Your number is too low by less than 66 numbers!")}
		else if (66 <= (winningNumber - playersGuess) && (winningNumber - playersGuess) <= 99) {return("Keeping trying though. Your number is too low by more than 65 numbers!")}
	}
}

function guessMessage(){
	$('div.message').text(lowerOrHigher())
}
//Need to revise the guessMessage() function to have it 
//only integrate the value returned from the lowerOrHigher() function.

// Check if the Player's Guess is the winning number 

function checkGuess(){
	playersGuessSubmission();
	if (playersGuess === winningNumber){
		$("div.guess").text("You've won! and it only took you " + guessCount + " guesses!").fadeIn('slow');
		$('#reset').show();
		$('div.message').text('');
		$('div.guesses').text('');
	}
	else {
		if (playersGuess in guessedNumbers){
			guessedNumbers.append(playersGuess)
		}
		guessCount += 1;
		$('#input').val("");
		$("div.guess").text("Sorry, guess again! You've now guessed " + guessCount + " times!").fadeIn('slow');
	}
	guessMessage();
	$('div.guesses').append(", ").append(playersGuess)
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	var hints = [winningNumber,
				 Math.floor((Math.random() * 100) + 1),
				 Math.floor((Math.random() * 100) + 1)]
	$('div.guess').text("The number is one of " + randomizeArray(hints))
}

// Allow the "Player" to Play Again

function playAgain(){
	winningNumber = generateWinningNumber();
	reset();
}

function reset(){
	$('div.guess').text('');
	$('div.message').text('');
	$('div.guesses').text('');
	$('#input').val("");
	$("#reset").show()
}

function randomizeArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var r = Math.floor((Math.random() * i) + 1)
        var tmp = arr[i];
        arr[i] = arr[r];
        arr[r] = tmp;
    }
    return arr
}
//I  googled this randomize function to display the hint
//in wit a random set of numbers but it's not quite working.

winningNumber = generateWinningNumber();


//Event Listeners/Handlers
$(document).ready(function(){
	$('#guess').click(function(){
		checkGuess();
	})
	$('#input').submit(function(event){
		event.preventDefault();
		checkGuess();
	})
	//The above is not working as intended, needs work.
	$('#hint').click(function(){
		provideHint();
	})
	$("#reset").hide();
	$("#reset").click(function(){
		playAgain();
		$("#reset").hide();
	})
})  
