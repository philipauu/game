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
  },

  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

var myGamePiece;
var myObstacles = [];
var myScore;

$(document).ready(setup);

function setup() {
  console.log('Inside setup');

  startGame();
}

function startGame() {
  console.log('Inside startGame');

  myGamePiece = new component(30, 30, "pink", 10, 120);
  myGameArea.start();
  myObstacles = new component(10, 200, "green", 300, 120);
}

function component(width, height, color, x, y, type) {

  this.type = type;
  this.score = 0;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.gravity = 0;
  this.gravitySpeed = 0;
  this.update = function() {
    ctx = myGameArea.context;
    if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.newPos = function() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();
  }
  this.hitBottom = function() {
    var bottom = myGameArea.canvas.height - this.height;
    if (this.y > bottom) {
      this.y = bottom;
      this.gravitySpeed = 0;
    }
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

function updateGameArea() {
  console.log('Inside updateGameArea');


  var x, height, gap, minHeight, maxHeight, minGap, maxGap;
  for (counter = 0; counter < myObstacles.length; counter += 1) {
    if (myGamePiece.crashWith(myObstacles[counter])) {
      return;
    }
  }

  myGameArea.clear();
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(150)) {
    x = myGameArea.canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    minGap = 50;
    maxGap = 200;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    // myObstacles.push(new component(10, height, "yellow", x, 0));
    // myObstacles.push(new component(10, x - height - gap, "yellow", x, height + gap));
  }

  for (counter = 0; counter < myObstacles.length; counter += 1) {
    myObstacles[counter].x += -1;
    myObstacles[counter].update();
  }
  // myScore.text="SCORE: " + myGameArea.frameNo;
  // myScore.update();
  myGamePiece.newPos();
  myGamePiece.update();
}

function everyinterval(n) {
  if ((myGameArea.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}

function accelerate(n) {
  myGamePiece.gravity = n;
}
