
/*
    Below is the basic logical flow of the game:

	Create a button object for each button image
	Choose a number of random colours to create a sequence
	Play the sequence to the player
	Allow the player to select a sequence
	If the player gets a sequence wrong then reset the level. If the player matches all sequences then end the round and go to the next level

	More in-depth details of the logic:

	The 'button' object is used to collate all data relating to the colored game buttons. It contains state data as well as functionality
	for handling button presses and button flashes. Four 'button' objects are created and added to the 'buttons' array when the page has loaded.

	At the start of a round the computer chooses a random sequence of colours via generateSequence(). The number of colors matches the players
	current level). Once the sequence is generated flashSequence() is called to present the memory sequence to the player. User input is disabled
	at this stage to prevent the user accidentally clicking on buttons.

	In flashSequence() a timer is used to flash the buttons in the order of the chosen sequence. This gives the player the opportunity to see 
	the sequence. During flashSequence(), the button object's flash() method is called to flash the button. Button flashing is achieved by
	changing the src property of the buttons HTML Image to a bitmap of a brighter shade. After a short delay the button image's bitmap is set
	back to the original bitmap to return the button to normal. Note that this same flash functionality is re-used when the player clicks on a
	button during the next stage.

	Once the computer finishes playing the memory sequence, input is enabled and the player is asked to replay the sequence by clicking on
	buttons in the same order that the computer chose. Each time the player clicks a button the players choice is checked against the choices
	that the computer made (within the 'sequences' array). The 'marker' variable is used to track which choice the player is currently taking so
	the choice can be tested against the correct element of the 'sequences' array. Should the player select an incorrect choice then the game
	is ended and the player is notified via roundOver(false). If the 'marker' reaches the total number of elements in the 'sequences' array then
	this signifies that the player has selected all of the correct entries in the sequence and is notified that they have won the round via
	roundOver(true).

	At the end of a round, the player is shown the result of the round by writing the result to the message div in the DOM in roundOver().
	If the user has won the round then their level is incremented and the next round started. If the user lost the round then the round is
	repeated.
*/

// Array of button objects
var buttons = [];

// Array of sequences that the AI will take
var sequences = [];

// Starting game level
var level = 1;

// The marker for the index in the sequence
var marker = 0;

// A flag which marks the sequence playback over
var sequenceOver = false;

// A flag which marks the game as 'not in progress'
var gameState = false;

// A flag that allows the user input at certain stages of the game.
var allowInput = true;

// Reuseable function to display current level at different stages.
function displayLevel() 
{
    document.getElementById("level").innerHTML = "Level - '" + level + "'";
}

// Reusable function to display any message to the 'message' ID element.
function displayMessage(text) 
{
    document.getElementById("message").innerHTML = text;
}

// Game button object
function button(id, color) 
{
    var imagePath = "assets/images/";
    var self = this;    // Store 'this' so it can be used inside the button handler
    
    this.id = id;
    this.color = color;
    this.state = false;    // A flag to say whether the instance of button has been pressed
    this.object = document.getElementById(color + "_button");
    
    // Add click event handler which calls pressed() function when the user clicks the image
    this.object.addEventListener("click", function() {
        if (!allowInput)    // Doesn't allow user input at this point if allowInput == false
        {    
            return;
        }
        self.pressed();
    });
    
    // Flash function that when called will change the image to a new image
    this.flash = function() 
    {
        var self = this;
        var sound = document.getElementById("sound" + this.id);
        
        this.object.src = imagePath + this.color + "_glow.png";    // Change to new image
        sound.play();    // Play sound
        sound.currentTime = 0;    
        
        // Start a timer which will be called after 400ms that changes the new image back to the original
        this.timer = setTimeout(function() {
            self.object.src = imagePath + self.color + ".png";
        }, 400);
    };
    
    // Pressed function is called when the user clicks on a game button. This function will flash the image
    // and then perform a check to see if the user clicks the correct color in the sequence.
    this.pressed = function() 
    {
        if (this.state || !sequenceOver || marker >= sequences.length) 
        {
            return;
        }
        var self = this;
        
        this.state = true;
        this.object.src = imagePath + this.color + "_glow.png";
        
        var sound = document.getElementById("sound" + this.id);
        sound.play();
        sound.currentTime = 0;
        
        this.timer = setTimeout(function() {
            self.object.src = imagePath + self.color + ".png";
            self.state = false;
        }, 400);
        if (sequences[marker] !== this.id)  // Check to see is the number chosen in the sequence is NOT the same as the button ID.
        {
            roundOver(false);   // Users choice did not match the sequence so round is lost
        } 
        else 
        {
            marker++;
            if (marker >= sequences.length)    // Checks to see if all the numbers in the sequence have been matched
            {
                roundOver(true);    // Users manges to match all choices in the sequence so round is won
            }
        }
    };
}

function generateSequence() {
    sequences = [];    // Empties the array each time the function is called to start a new sequence
    
    // Generates a random number sequence. The total number is equal to the level number. 
    for (var t = 0; t < level; t++)
    {
        sequences.push(Math.random() * 4 | 0);  // Picks a number between 0 and 3 and pushes to sequences array
    }
}

function flashSequence() {
   allowInput = false;   // No input allowed until the function has ended
   var choice = sequences[marker];
   buttons[choice].flash();    // Flashes the button that has the same index as the the sequence choice
   marker++;    
   if (marker < sequences.length)
   {
        // Start a timer to flash the sequence
        setTimeout(function() {
            flashSequence();
        }, 1000);
   } 
   else 
   {    
        // We got to the end of the sequence so we end sequence instead of restarting timer
        endSequence();
   }
}

function endSequence() 
{
    // Reset the marker and mark the sequence as over so the user can press the buttons
    marker = 0;
    allowInput = true;
    sequenceOver = true;
    displayMessage("Press the buttons in the same order, good luck!");
}

function roundOver(won) 
{
    sequenceOver = false;
    if (!won) 
    {
        displayMessage("Round over friend, try again!");
    } 
    else 
    {
        displayMessage("Round won friend, continue to the next round!");
        level++;    // Increment level if round is won
    }
    
    // Move to next round after 2s
    setTimeout(function() {
        startGame();
    }, 2000);
    
}

function startGame() 
{
    marker = 0;
    displayLevel();
    displayMessage("Remember the sequence!")
    generateSequence();    // Generates new sequence with new numbers with a lenth equal to level number
    // After 1s the starting sequence will begin to flash
    setTimeout(function() {
        flashSequence();    
    }, 1000);
    
}

function restartGame() 
{
    marker = 0;
    level = 1;  // Sets the level back to 1 
    displayLevel(); 
    displayMessage("Remember the sequence!")
    generateSequence();
    setTimeout(function() {
        flashSequence();    
    }, 2000);
}

$("#start_button").on("click", function() {
    if (!allowInput) // The user cannot click the button unless allowInput == true
    {
        return;
    }
    allowInput = false; // This flag makes sure the user can only click the button until the sequence is over 
    if (gameState === false) 
    {
        startGame();
        $("#start_button").html("Restart");
        gameState = true;    // Once game has started it will always be 'in progress' so this code is only be ran once.
    } 
    else 
    {
        restartGame(); 
    }
    $(".img_buttons").addClass('cursor_pointer');
});
