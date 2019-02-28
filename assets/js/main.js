var buttons = [];
var imagePath = "assets/images/";

function button(id, color)
{
    var self = this;
    this.id = id;
    this.color = color;
    this.object = document.getElementById(color + "_button");
    this.flash = function()
    {
        var self = this;
        this.object.src = imagePath + this.color + "_glow.png";
        this.timer = setTimeout(function() {
            self.object.src = imagePath + self.color + ".png";
        }, 500);
    }
}

function flashButton()
{
    for (var t = 0; t < buttons.length; t++)
    {
        buttons[t].flash();
    }
}

window.onload = function(e)
{
   buttons.push(new button(0, "yellow"));
   buttons.push(new button(1, "blue"));
   buttons.push(new button(2, "red"));
   buttons.push(new button(3, "green"));
   
   flashButton();
}