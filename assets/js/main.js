var buttons = [];

function button(id, color)
{
    self = this;
    this.id = id;
    this.color = color;
    this.object = document.getElementById(color + "_button");
}

window.onload = function(e)
{
   button.push(new button(0, "yellow"));
   button.push(new button(1, "blue"));
   button.push(new button(2, "red"));
   button.push(new button(3, "green"));
}