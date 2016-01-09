console.log("Will you quit? Have fun in the console!");
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function percentageToRGB(r,g,b) {
    var r = parseInt(r * 2.55);
    var g = parseInt(g * 2.55);
    var b = parseInt(b * 2.55);

    return "rgb("+ r +","+ g +","+ b +")";
}

function circle(posX, posY, radius, fillColor, line, lineColor) {
  context.beginPath();
  context.arc(posX, posY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = fillColor;
  context.fill();
  context.lineWidth = line;
  context.strokeStyle = lineColor;
  context.stroke();
}


var cursorX;
var cursorY;
document.onclick = function(e){
var fill = percentageToRGB(Math.floor(Math.random()*100), Math.floor(Math.random()*100), Math.floor(Math.random()*100));

    cursorX = e.pageX;
    cursorY = e.pageY;
    console.log("added a ball.");
    circle(cursorX, cursorY, document.getElementById("sizeSlider").value, fill, 0, fill);
}
