var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth - 90;
canvas.height = window.innerHeight - 90;

var pacman = {
    x: 400,
    y: 400,
    width: 64,
    height: 64,
    speed: 500,
};

pacman.state = 0;
var pacmanTiles = {
    loaded: false,
    image: new Image(),
    tileWidth: 64,
    tileHeight: 64,
    state: 0,
};
pacmanTiles.image.onload = function() {
   pacmanTiles.loaded = true;
}
pacmanTiles.image.src = 'pacmeister.png';

var dew = {
    x: Math.random() * canvas.width - 10,
    y: Math.random() * canvas.height - 10,
    width: 32,
    height: 32,
    state: 0,
};

var dewTiles = {
    loaded: false,
    image: new Image(),
    tileWidth: 64,
    tileHeight: 64
};
dewTiles.image.onload = function() {
   dewTiles.loaded = true;
}
dewTiles.image.src = 'Soda.png';


var score = 0;

var music = new Audio('dubstep.mp3');
music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
music.play();

var airhorn = new Audio('airhorn.mp3');

var keysDown = {};
window.addEventListener('keydown', function(e) {
    keysDown[e.keyCode] = true;
});
window.addEventListener('keyup', function(e) {
    delete keysDown[e.keyCode];
});

function update(mod) {
  for (var k in keysDown) {
    switch (Number(k)) {
    //case 37:
    case 65:
      pacman.x -= pacman.speed * mod;
      pacman.state = 2;
      break;
    //case 38:
    case 87:
      pacman.y -= pacman.speed * mod;
      pacman.state = 3;
      break;
    //case 39:
    case 68:
      pacman.x += pacman.speed * mod;
      pacman.state = 0;
      break;
    //case 40:
    case 83:
      pacman.y += pacman.speed * mod;
      pacman.state = 1;
      break;
    case 77:
      //mute music
      music.pause();
      break;
    case 80:
    //play music
    music.play()
      break;
    }
  }

  if (!(pacman.x + pacman.width < dew.x ||
        dew.x + dew.width < pacman.x ||
        pacman.y + pacman.height < dew.y ||
        dew.y + dew.height < pacman.y )) {
    airhorn.currentTime = 0;
    airhorn.play();
    score++;
    dew.x = Math.random() * canvas.width;
    dew.y = Math.random() * canvas.height;
  }
  if (pacman.x >= canvas.width) {
    pacman.x = 0;
  }
  if (pacman.x < 0) {
    pacman.x = canvas.width - 1;
  }
  if (pacman.y >= canvas.height) {
    pacman.y = 0;
  }
  if (pacman.y < 0) {
    pacman.y = canvas.height - 1;
  }
}

function render() {
    context.fillStyle = '#0fffed';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.font = 'Bold 50pt Bank Gothic';
    context.fillStyle = '#FF0000';
    context.textBaseline = 'top';
    context.fillText(score + " Swag Obtained", 10, 10);

    if (pacmanTiles.loaded) {
    context.drawImage(
        pacmanTiles.image,
        pacman.state * pacmanTiles.tileWidth,
        0,
        pacman.width,
        pacman.height,
        Math.round(pacman.x),
        Math.round(pacman.y),
        pacman.width,
        pacman.height
      );
  }

    if (dewTiles.loaded) {
      context.drawImage(
        dewTiles.image,
        dew.state * dewTiles.tileWidth,
        0,
        dew.width,
        dew.height,
        Math.round(dew.x),
        Math.round(dew.y),
        dew.width,
        dew.height
    );
  }
}

function run() {
    update((Date.now() - time) / 1000);
    render();
    time = Date.now();
}

var time = Date.now();
setInterval(run, 10);
