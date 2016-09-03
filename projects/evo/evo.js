//canvas
var canvas = geid('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 950;
function geid(id) {return document.getElementById(id);}
//population
// each member of the population should look like {value1: 123 value 2 : 123, etc}
var popuCount = geid("popuCount").value;
var getPopuCount = function() {popuCount = geid("popuCount").value;};
var popu = [];
//the below is done so that there is a max value (10000), that cannot be gone above.
for (var i = 0; i < 10000; i++) {
  birth(i, 0, rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand());
}
//got goals?
function getGoals() {
  goalRX = geid("goalRX").value;
  goalGX = geid("goalGX").value;
  goalBX = geid("goalBX").value;
  goalX = percentageToRGB(goalRX, goalGX, goalBX);

  goalRY = geid("goalRY").value;
  goalGY = geid("goalGY").value;
  goalBY = geid("goalBY").value;
  goalY = percentageToRGB(goalRY, goalGY, goalBY);
}
getGoals();

function randomize() {
  geid("goalRX").value = rand();
  geid("goalBX").value = rand();
  geid("goalGX").value = rand();
  geid("goalRY").value = rand();
  geid("goalGY").value = rand();
  geid("goalBY").value = rand();
}
function setSpeed() {
  clearInterval(evolve);
  evolve = setInterval(mate, geid("evoSpeed").value);
}
//this is done so that the the setSpeed function does not throw an undefined error when you hit it the first time.
evolve = setInterval(mate, 10000000);
clearInterval(evolve);

//a function that turns values from 0-100 into colors.
function percentageToRGB(r,g,b) {
    var r = parseInt(r * 2.55);
    var g = parseInt(g * 2.55);
    var b = parseInt(b * 2.55);

    return "rgb("+ r +","+ g +","+ b +")";
}
//A function for making circles.
function circle(posX, posY, radius, fillColor, line, lineColor) {
  ctx.beginPath();
  ctx.arc(posX, posY, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.lineWidth = line;
  ctx.strokeStyle = lineColor;
  ctx.stroke();
}

function line(width, color, startx, starty, endx, endy) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.strokeStyle = color
  ctx.moveTo(startx, starty);
  ctx.lineTo(endx, endy);
  ctx.stroke();
}
//for input circles
var inputRed = percentageToRGB(100, 0, 0);
var inputGreen = percentageToRGB(0, 100, 0);
var inputBlue = percentageToRGB(0, 0, 100);


//a1, a2, etc are input weights from a input, leading into h1, h2, h3, and h4. the h's are hidden nodes with weights leading into the ouputs x and y.
function birth(birthplace, gen, a1, a2, a3, a4, b1, b2, b3, b4, c1, c2, c3, c4, h1x, h1y, h2x, h2y, h3x, h3y, h4x, h4y) {
  popu[birthplace] = {
    home:birthplace,
    gen:gen,
    dev:null,
    a1:a1,
    a2:a2,
    a3:a3,
    a4:a4,
    b1:b1,
    b2:b2,
    b3:b3,
    b4:b4,
    c1:c1,
    c2:c2,
    c3:c3,
    c4:c4,
    h1x:h1x,
    h1y:h1y,
    h2x:h2x,
    h2y:h2y,
    h3x:h3x,
    h3y:h3y,
    h4x:h4x,
    h4y:h4y
    }
}

function rand(){
  return Math.random()*100;
}

//function pointM(gene) {popu[popuHome].gene = rand();}

function mutate(popuHome) {
  switch (Math.floor(Math.random()*20)) {
    case 0:
        popu[popuHome].a1 = rand();
        break;
    case 1:
        popu[popuHome].a2 = rand();
        break;
    case 2:
        popu[popuHome].a3 = rand();
        break;
    case 3:
        popu[popuHome].a4 = rand();
        break;
    case 4:
        popu[popuHome].b1 = rand();
        break;
    case 5:
        popu[popuHome].b2 = rand();
        break;
    case 6:
        popu[popuHome].b3 = rand();
        break;
    case 7:
        popu[popuHome].b4 = rand();
        break;
    case 8:
        popu[popuHome].c1 = rand();
        break;
    case 9:
        popu[popuHome].c2 = rand();
        break;
    case 10:
        popu[popuHome].c3 = rand();
        break;
    case 11:
        popu[popuHome].c4 = rand();
        break;
    case 12:
        popu[popuHome].h1x = rand();
        break;
    case 13:
        popu[popuHome].h1y = rand();
        break;
    case 14:
        popu[popuHome].h2x = rand();
        break;
    case 15:
        popu[popuHome].h2y = rand();
        break;
    case 16:
        popu[popuHome].h3x = rand();
        break;
    case 17:
        popu[popuHome].h3y = rand();
        break;
    case 18:
        popu[popuHome].h4x = rand();
        break;
    case 19:
        popu[popuHome].h4y = rand();
        break;
  }

}
function sq(num) {return num*num;}
function getDev() {
  return sq(goalRX-outputRX)+sq(goalGX-outputGX)+sq(goalBX-outputBX)+sq(goalRY-outputRY)+sq(goalGY-outputGY)+sq(goalBY-outputBY);
}
function mate() {
  getGoals();
  getPopuCount();
  //select 3 members of popu to compete
  mate1 = Math.floor(Math.random()*popuCount);
  drawCreature(mate1);
  //deviation = antifitness, weakness
  mate1Dev = getDev();
  mate2 = Math.floor(Math.random()*popuCount);
  drawCreature(mate2);
  mate2Dev = getDev();

  mate3 = Math.floor(Math.random()*popuCount);
  drawCreature(mate3);
  mate3Dev = getDev();


  if (mate1Dev > mate2Dev && mate1Dev > mate3Dev) {
    //mate 2, 3
//    console.log("Mating "+mate2 + " with "+ mate3 + ". "+mate1+" killed and taken over by the newborn");
    if(popu[mate2].gen >= popu[mate3] ) {
      babyGen = popu[mate2].gen+1;
    } else {
      babyGen = popu[mate3].gen+1;
    }

    birth(mate1, babyGen, (popu[mate2].a1+popu[mate3].a1)/2, (popu[mate2].a2+popu[mate3].a2)/2, (popu[mate2].a3+popu[mate3].a3)/2, (popu[mate2].a4+popu[mate3].a4)/2, (popu[mate2].b1+popu[mate3].b1)/2, (popu[mate2].b2+popu[mate3].b2)/2, (popu[mate2].b3+popu[mate3].b3)/2, (popu[mate2].b4+popu[mate3].b4)/2, (popu[mate2].c1+popu[mate3].c1)/2, (popu[mate2].c2+popu[mate3].c2)/2, (popu[mate2].c3+popu[mate3].c3)/2, (popu[mate2].c4+popu[mate3].c4)/2, (popu[mate2].h1x+popu[mate3].h1x)/2, (popu[mate2].h1y+popu[mate3].h1y)/2, (popu[mate2].h2x+popu[mate3].h2x)/2, (popu[mate2].h2y+popu[mate3].h2y)/2, (popu[mate2].h3x+popu[mate3].h3x)/2, (popu[mate2].h3y+popu[mate3].h3y)/2, (popu[mate2].h4x+popu[mate3].h4x)/2, (popu[mate2].h4y+popu[mate3].h4y)/2);
    mutate(mate1);
    drawCreature(mate1);
  } else if (mate2Dev > mate1Dev && mate2Dev > mate3Dev) {
    //mate 1, 3
//    console.log("Mating "+mate1 + " with "+ mate3 + ". "+mate2+" killed and taken over by the newborn");
    if(popu[mate1].gen >= popu[mate3] ) {
      babyGen = popu[mate1].gen+1;
    } else {
      babyGen = popu[mate3].gen+1;
    }

    birth(mate2, babyGen, (popu[mate1].a1+popu[mate3].a1)/2, (popu[mate1].a2+popu[mate3].a2)/2, (popu[mate1].a3+popu[mate3].a3)/2, (popu[mate1].a4+popu[mate3].a4)/2, (popu[mate1].b1+popu[mate3].b1)/2, (popu[mate1].b2+popu[mate3].b2)/2, (popu[mate1].b3+popu[mate3].b3)/2, (popu[mate1].b4+popu[mate3].b4)/2, (popu[mate1].c1+popu[mate3].c1)/2, (popu[mate1].c2+popu[mate3].c2)/2, (popu[mate1].c3+popu[mate3].c3)/2, (popu[mate1].c4+popu[mate3].c4)/2, (popu[mate1].h1x+popu[mate3].h1x)/2, (popu[mate1].h1y+popu[mate3].h1y)/2, (popu[mate1].h2x+popu[mate3].h2x)/2, (popu[mate1].h2y+popu[mate3].h2y)/2, (popu[mate1].h3x+popu[mate3].h3x)/2, (popu[mate1].h3y+popu[mate3].h3y)/2, (popu[mate1].h4x+popu[mate3].h4x)/2, (popu[mate1].h4y+popu[mate3].h4y)/2);
    mutate(mate2);
    drawCreature(mate2);
  } else {
    //mate 1, 2
//    console.log("Mating "+mate1 + " with "+ mate2 + ". "+mate3+" killed and taken over by the newborn");
    if(popu[mate1].gen >= popu[mate2] ) {
      babyGen = popu[mate1].gen+1;
    } else {
      babyGen = popu[mate2].gen+1;
    }

    birth(mate3, babyGen, (popu[mate1].a1+popu[mate2].a1)/2, (popu[mate1].a2+popu[mate2].a2)/2, (popu[mate1].a3+popu[mate2].a3)/2, (popu[mate1].a4+popu[mate2].a4)/2, (popu[mate1].b1+popu[mate2].b1)/2, (popu[mate1].b2+popu[mate2].b2)/2, (popu[mate1].b3+popu[mate2].b3)/2, (popu[mate1].b4+popu[mate2].b4)/2, (popu[mate1].c1+popu[mate2].c1)/2, (popu[mate1].c2+popu[mate2].c2)/2, (popu[mate1].c3+popu[mate2].c3)/2, (popu[mate1].c4+popu[mate2].c4)/2, (popu[mate1].h1x+popu[mate2].h1x)/2, (popu[mate1].h1y+popu[mate2].h1y)/2, (popu[mate1].h2x+popu[mate2].h2x)/2, (popu[mate1].h2y+popu[mate2].h2y)/2, (popu[mate1].h3x+popu[mate2].h3x)/2, (popu[mate1].h3y+popu[mate2].h3y)/2, (popu[mate1].h4x+popu[mate2].h4x)/2, (popu[mate1].h4y+popu[mate2].h4y)/2);
    if (Math.random()<.5){mutate(mate3);}
    drawCreature(mate3);
  }

}


function drawCreature(popuHome) {
  getGoals();

  critter = popu[popuHome];
  //clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //line from inputs too hidden nodes
  line((critter.a1)/5, percentageToRGB(critter.a1, 0, 0), 300, 300, 600, 200);
  line((critter.a2)/5, percentageToRGB(critter.a2, 0, 0), 300, 300, 600, 400);
  line((critter.a3)/5, percentageToRGB(critter.a3, 0, 0), 300, 300, 600, 600);
  line((critter.a4)/5, percentageToRGB(critter.a4, 0, 0), 300, 300, 600, 800);

  line((critter.b1)/5, percentageToRGB(0, critter.b1, 0), 300, 500, 600, 200);
  line((critter.b3)/5, percentageToRGB(0, critter.b3, 0), 300, 500, 600, 600);
  line((critter.b2)/5, percentageToRGB(0, critter.b2, 0), 300, 500, 600, 400);
  line((critter.b4)/5, percentageToRGB(0, critter.b4, 0), 300, 500, 600, 800);

  line((critter.c1)/5, percentageToRGB(0, 0, critter.c1), 300, 700, 600, 200);
  line((critter.c3)/5, percentageToRGB(0, 0, critter.c3), 300, 700, 600, 600);
  line((critter.c2)/5, percentageToRGB(0, 0, critter.c2), 300, 700, 600, 400);
  line((critter.c4)/5, percentageToRGB(0, 0, critter.c4), 300, 700, 600, 800);

//  node1 = critter.a1, critter.b1, critter.c1
  node1Color = percentageToRGB(critter.a1, critter.b1, critter.c1);
  node2Color = percentageToRGB(critter.a2, critter.b2, critter.c2);
  node3Color = percentageToRGB(critter.a3, critter.b3, critter.c3);
  node4Color = percentageToRGB(critter.a4, critter.b4, critter.c4);

  //lines from hidden nodes to outputs

  line((critter.h1x)/5, node1Color, 600, 200, 900, 350);
  line((critter.h1y)/5, node1Color, 600, 200, 900, 650);

  line((critter.h2x)/5, node2Color, 600, 400, 900, 350);
  line((critter.h2y)/5, node2Color, 600, 400, 900, 650);

  line((critter.h3x)/5, node3Color, 600, 600, 900, 350);
  line((critter.h3y)/5, node3Color, 600, 600, 900, 650);

  line((critter.h4x)/5, node4Color, 600, 800, 900, 350);
  line((critter.h4y)/5, node4Color, 600, 800, 900, 650);




  //input circles
  circle(300, 300, 60, inputRed, 5, percentageToRGB(0,0,0));
  circle(300, 500, 60, inputGreen, 5, percentageToRGB(0,0,0));
  circle(300, 700, 60, inputBlue, 5, percentageToRGB(0,0,0));


  //hidden node circes
  circle(600, 200, 60, node1Color, 5, percentageToRGB(0,0,0));
  circle(600, 400, 60, node2Color, 5, percentageToRGB(0,0,0));
  circle(600, 600, 60, node3Color, 5, percentageToRGB(0,0,0));
  circle(600, 800, 60, node4Color, 5, percentageToRGB(0,0,0));

  // output circles
  output1RX = critter.a1 * (critter.h1x/100);
  output2RX = critter.a2 * (critter.h2x/100);
  output3RX = critter.a3 * (critter.h3x/100);
  output4RX = critter.a4 * (critter.h4x/100);

  outputRX= (output1RX+output2RX+output3RX+output4RX)/4;

  output1GX = critter.b1 * (critter.h1x/100);
  output2GX = critter.b2 * (critter.h2x/100);
  output3GX = critter.b3 * (critter.h3x/100);
  output4GX = critter.b4 * (critter.h4x/100);

  outputGX= (output1GX+output2GX+output3GX+output4GX)/4;

  output1BX = critter.c1 * (critter.h1x/100);
  output2BX = critter.c2 * (critter.h2x/100);
  output3BX = critter.c3 * (critter.h3x/100);
  output4BX = critter.c4 * (critter.h4x/100);

  outputBX= (output1BX+output2BX+output3BX+output4BX)/4;



  output1RY = critter.a1 * (critter.h1y/100);
  output2RY = critter.a2 * (critter.h2y/100);
  output3RY = critter.a3 * (critter.h3y/100);
  output4RY = critter.a4 * (critter.h4y/100);

  outputRY= (output1RY+output2RY+output3RY+output4RY)/4;

  output1GY = critter.b1 * (critter.h1y/100);
  output2GY = critter.b2 * (critter.h2y/100);
  output3GY = critter.b3 * (critter.h3y/100);
  output4GY = critter.b4 * (critter.h4y/100);

  outputGY= (output1GY+output2GY+output3GY+output4GY)/4;

  output1BY = critter.c1 * (critter.h1y/100);
  output2BY = critter.c2 * (critter.h2y/100);
  output3BY = critter.c3 * (critter.h3y/100);
  output4BY = critter.c4 * (critter.h4y/100);

  outputBY= (output1BY+output2RY+output3BY+output4BY)/4;


  circle(900, 350, 60, percentageToRGB(outputRX, outputGX, outputBX), 20, goalX);
  circle(900, 650, 60, percentageToRGB(outputRY, outputGY, outputBY), 20, goalY);

  critter.dev = getDev();
  drawData();
}
function drawData() {
  ctx.fillStyle = "black";
  ctx.font = "16px Arial";
  ctx.fillText("Generation: " + critter.gen,0,100);
  ctx.fillText("Fitness Deviation: " + critter.dev.toFixed(3),0,120);
  ctx.fillText("Home: " + critter.home,0,140);

}

//run function
function generate() {
  //make goals
  getGoals();
  getPopuCount();
  //generate starting population
  for (var i = 0; i < popuCount; i++) {
    birth(i, 0, rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand(), rand());
  }
}
