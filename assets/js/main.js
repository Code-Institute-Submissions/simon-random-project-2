var buttons = [];
var sequences = [];
var level = 1;


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
    console.log(sequences);
    
}

function flashButton() {
    for (var t = 0; t < buttons.length; t++) {
        buttons[t].flash();
    }
}

$("#start_button").on("click", function() {
    flashButton();
    generateSequence();
    level++;
    //$("#start_button").html("Restart");
});

window.onload = function(e) {
    buttons.push(new button(0, "yellow"));
    buttons.push(new button(1, "blue"));
    buttons.push(new button(2, "red"));
    buttons.push(new button(3, "green"));

    
    
};
