
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');



var x = canvas.width / 2;
var y = canvas.height - 100;
// variables imitating ball movement, added in draw function to x and y
var dx = 2; // increase value and you'll increase ball speed 
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#FF0000';  
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - 2 * paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#FF0000';
  ctx.fill();
  ctx.closePath();
}

function draw() {
  //clears ball trail in canvas
  ctx.clearRect(0,0, canvas.width, canvas.height);
  
  //making ball bounce off the canvas edge
  if (y + dy < ballRadius || y + dy > canvas.height - ballRadius) { //ballRadius val allows to bounce from the edge, withe the ball's edge
    dy = -dy;
  }
  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx;
  }
  
  drawBall();
  drawPaddle();
  
  x += dx;
  y += dy;    
}

setInterval(draw, 10);
//test
