var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x=canvas.width/2;
var y=canvas.height/2;
var dx=2;
var dy=-2;
var radius = 20;


function Ball(x){
  this.x=x;
}
var ball = new Ball(10);

function drawBall(){
  ctx.beginPath();
  ctx.arc(x,y,radius,10,0,2*Math.PI);
  
  y -= dy;
  if(y>canvas.height-100){
    dy=-dy;
    
  }
  if (y < 52) {
    dy = -dy;
   
  }
  ctx.fillStyle="#0095DD";
  ctx.fill();
  ctx.closePath();
 
}
function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();

}

setInterval(draw,10);