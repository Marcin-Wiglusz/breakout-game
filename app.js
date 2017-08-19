var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

setInterval(draw, 10);

var x = canvas.width / 2;
var y = canvas.height - 100;
// variables imitating ball movement, added in draw function to x and y
var dx = 2;
var dy = -2;

function draw() {
  //clears ball trail in canvas
  ctx.clearRect(0,0, canvas.width, canvas.height);
  
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = '#FF0000';
  ctx.fill();
  x += dx;
  y += dy;
  ctx.closePath();
}
