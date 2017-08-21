
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');



var x = canvas.width / 2;
var y = canvas.height - 100;
// variables imitating ball movement, added in draw function to x and y
var dx = 2; // increase value and you'll increase ball speed 
var dy = -2;

var ballRadius = 10;
var barHeight = 10;
var barWidth = 75;
var barX = (canvas.width - barWidth) / 2;

var rightPressed = false;
var leftPressed = false;


//moving bar with right/left arrows

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

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
  ctx.rect(barX, canvas.height - 2 * barHeight, barWidth, barHeight);
  ctx.fillStyle = '#FF0000';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  //clears ball trail in canvas
  ctx.clearRect(0,0, canvas.width, canvas.height);
  
  drawBall();
  drawBar();
  
  //making ball bounce off the canvas edge
  if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) { //ballRadius val allows to bounce from the edge, withe the ball's edge
    dy = -dy;
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
