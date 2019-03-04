var buttons = [];
var sequences = [];
var level = 4;
var marker = 0;
var sequenceOver = false;
var gameState = false;


function button(id, color) {
    var imagePath = "assets/images/";
    var self = this;
    
    this.id = id;
    this.color = color;
    this.state = false;
    this.object = document.getElementById(color + "_button");
    this.object.addEventListener("click", function() {
        self.pressed();
    });
    this.flash = function() {
        var self = this;
        
        this.object.src = imagePath + this.color + "_glow.png";
        this.timer = setTimeout(function() {
            self.object.src = imagePath + self.color + ".png";
        }, 400);
    };
    this.pressed = function() {
        if (this.state)
            return;

        var self = this;
        this.state = true;
        this.object.src = imagePath + this.color + "_glow.png";
        this.timer = setTimeout(function() {
            self.object.src = imagePath + self.color + ".png";
            self.state = false;
        }, 400);
        
    };
}

function generateSequence() {
    sequences = [];
    for (var t = 0; t < level; t++)
    {
        sequences.push(Math.random() * 4 | 0);
    }
    
}

function flashSequence() {
   var choice = sequences[marker];
   buttons[choice].flash();
   marker++;
  if (marker < sequences.length)
  {
      setTimeout(function() {
          flashSequence();
      }, 1000);
  } else {
      endSequence();
  }
}

function endSequence() {
    marker = 0;
    sequenceOver = true;
    document.getElementById("message").innerHTML = "Press the buttons in the same order, good luck!";
}

function roundOver(won) {
    if (!won) 
        document.getElementById("message").innerHTML = "Round over friend, try again!";
    else {
        document.getElementById("message").innerHTML = "Round won friend, continue to the next round!";
        level++;
    }
    
    setTimeout(function() {
        startGame();
    }, 2000);
    
}

function startGame() {
    generateSequence();
    flashSequence();
    
}

function restartGame() {
    marker = 0;
    level = 1;
    generateSequence();
    flashSequence();
    console.log("restart");
}

$("#start_button").on("click", function() {
    
    if (gameState === false)
    {
        startGame();
        $("#start_button").html("Restart");
        gameState = true;
    } else {
        restartGame();
    }
});

window.onload = function(e) {
    buttons.push(new button(0, "yellow"));
    buttons.push(new button(1, "blue"));
    buttons.push(new button(2, "red"));
    buttons.push(new button(3, "green"));
};
