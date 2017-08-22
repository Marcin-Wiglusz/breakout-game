
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');



var x = canvas.width / 2;
var y = canvas.height - 100;
// variables imitating ball movement, added in draw function to x and y
var dx = 2; // increase value and you'll increase ball speed 
var dy = -2;

var ballRadius = 5;
var barHeight = 10;
var barWidth = 75;
var barX = (canvas.width - barWidth) / 2;

var rightPressed = false;
var leftPressed = false;

var brickWidth = 50;
var brickHeight = 20;
var brickColumns = 8;
var brickRows = 5;
var brickMargin = 5;
var brickTopPadding = 30;
var brickLeftPadding = 20;

var score = 0;

var bricks = [];
for (var i = 0; i < brickColumns; i++){
  bricks[i] = [];
  for (var j = 0; j < brickRows; j++){
    //creating a brick object
    bricks[i][j] = {x: 0, y: 0, status: 1}
  }
}


function drawBricks() {
  for (var i = 0; i < brickColumns; i ++) {
    for (var j = 0; j < brickRows; j++) {
      if (bricks[i][j].status == 1){
        var brickX = (i * (brickWidth + brickMargin)) + brickLeftPadding;
        var brickY = (j * (brickHeight + brickMargin)) + brickTopPadding;
        bricks[i][j].x = brickX;
        bricks[i][j].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = '#FF0000';
        ctx.fill();
        ctx.closePath();
      }  
    }
  }
}

function ballCollision() {
  for (var i = 0; i < brickColumns; i++) {
    for (var j = 0; j < brickRows; j++) {
      var bang = bricks[i][j];
      if (bang.status == 1) {
        if (x > bang.x && x < bang.x + brickWidth && y > bang.y && y < bang.y + brickHeight) {
          dy = -dy;
          bang.status = 0;
          score++;
          if (score == brickColumns * brickRows) {
            alert('YOU WIN');
            document.location.reload();
          }
        }
      }  
    }
  }
}

function drawScore() {
  ctx.font = '20px Arial';
  ctx.fillStyle = '#FF0000';
  ctx.fillText('Score: ' + score, 5, 20);
}


//moving bar with right/left arrows

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

document.addEventListener('mousemove', mouseMoveHandler);

function mouseMoveHandler(event) {
  var relativeX = event.clientX - canvas.offsetLeft;
  if (relativeX > 0 + barWidth / 2 && relativeX < canvas.width - barWidth / 2) {
    barX = relativeX - barWidth / 2;
  }
}

function keyDownHandler(event) {
  if (event.keyCode == 39){
    rightPressed = true;
  }
  else if (event.keyCode == 37) {
    leftPressed = true;
  }
}
function keyUpHandler(event) {
  if (event.keyCode == 39) {
    rightPressed = false;
  }
  else if (event.keyCode == 37) {
    leftPressed = false;
  }
}


function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#FF0000';  
  ctx.fill();
  ctx.closePath();
}

function drawBar() {
  ctx.beginPath();
  ctx.rect(barX, canvas.height - barHeight, barWidth, barHeight);
  ctx.fillStyle = '#FF0000';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  //clears ball trail in canvas
  ctx.clearRect(0,0, canvas.width, canvas.height);
  
  drawBall();
  drawBar();
  drawBricks();
  ballCollision();
  drawScore();  
  
  //making ball bounce off the canvas edge
  if (y + dy < ballRadius) { //ballRadius val allows to bounce from the edge, with the the ball's edge
    dy = -dy;
  }
  //allowing the ball to pass bottom edge
  else if (y + dy > canvas.height - ballRadius) {
    //making the ball bounce off the bar
    if (x > barX && x < barX + barWidth) {
      dy = -dy;
    }
    else{
      alert('DAMN');
      document.location.reload(); 
    }    
  }
  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx;
  }  
  
  //moving the bar
  if (rightPressed && barX < canvas.width - barWidth) {
    barX += 6;
  }
  else if (leftPressed && barX > 0) {
    barX -= 6;
  }
  

  
  x += dx;
  y += dy;    
}

setInterval(draw, 10);
//test
