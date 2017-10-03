console.log('up and running!');

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);

    window.addEventListener('keydown', function (e) {
      myGameArea.keys = e.keyCode;
    })
    window.addEventListener('keyup', function (e) {
      myGameArea.keys = false;
  })
},

  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },

  stop: function() {
    clearInverval(this.interval);
  }
}

var myGamePiece;

var myObstacles;

$(document).ready(setup);

function setup() {
  console.log('Inside setup');
  startGame();
}

function startGame() {
  myGamePiece = new component(30, 30, "red", 10, 120);
  myGameArea.start();
  myObstacles = new component(10, 200, "yellow", 300, 120);
}

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (this.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y(this.height);

    var crash = true;

    if ((mybottom < othertop) ||
      (mytop > otherbottom) ||
      (myright < otherleft) ||
      (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
}

function moveup() {
  myGamePiece.speedY -= 1;
}

function movedown() {
  myGamePiece.speedY += 1;
}

function stopMove() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}

function everyinterval(note) {
  if ((myGameArea.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}

function updateGameArea() {
  myGameArea.clear();
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
  if (myGameArea.key && myGameArea.key == 37) {
    myGamePiece.speedX = -1;
  }
  if (myGameArea.key && myGameArea.key == 39) {
    myGamePiece.speedX = 1;
  }
  if (myGameArea.key && myGameArea.key == 38) {
    myGamePiece.speedY = -1;
  }
  if (myGameArea.key && myGameArea.key == 40) {
    myGamePiece.speedY = 1;
  }
  myObstacles.update();
  myGamePiece.newPos();
  myGamePiece.update();
}
