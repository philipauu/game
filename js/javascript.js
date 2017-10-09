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

var bird;
var obstacles = [];
var obstacle;
var score;

$(document).ready(setup);

function setup() {
  console.log('Inside setup');

  startGame();
}

function startGame() {
  console.log('Inside startGame');

  bird = new component(30, 30, "khaki", 10, 120);
  bird.gravity = 0.05;
  score = new component('30px', 'times new roman', 'black', 280, 40, 'text');

  myGameArea.start();
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
    var otherbottom = otherobj.y + (this.height);

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
  for (counter = 0; counter < obstacles.length; counter += 1) {
    if (bird.crashWith(obstacles[counter])) {
      return;
    }
  }

  myGameArea.clear();
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(100)) {
    x = myGameArea.canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    minGap = 50;
    maxGap = 200;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);

    obstacles.push(new component(20, height, "pink", x, 0));
    obstacles.push(new component(20, x - height - gap, "pink", x, height + gap));
  }

  for (counter = 0; counter < obstacles.length; counter += 1) {
    obstacles[counter].x += -3;
    obstacles[counter].update();
  }
  score.text = "SCORE: " + myGameArea.frameNo;
  score.update();
  bird.newPos();
  bird.update();
}

function everyinterval(shift) {
  if ((myGameArea.frameNo / shift) % 1 == 0) {
    return true;
  }
  return false;
}

function accelerate(shift) {
  bird.gravity = shift;
}

function replay() {
  location.reload();
}
