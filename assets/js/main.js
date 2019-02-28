var buttons = [];

function button(id, color)
{
    self = this;
    this.id = id;
    this.color = color;
    this.object = document.getElementById(color + "_button");
}