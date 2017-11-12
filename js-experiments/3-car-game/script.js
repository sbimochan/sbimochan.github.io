function Car(carDiv, track) {
  this.element = carDiv;
  this.track = track;
  // console.log(this.track);

  this.x = 250;
  this.y = 0;
  this.dy = 5;

  this.updatePosition = function() {
    this.y = this.y + this.dy;
    this.track.style.backgroundPosition = "center " + this.y + "px";
    if (this.y == 10000) {
     
      alert("Give rest to your eyes");
      
    }
    scoreGame=this.y/1000;
    var score = document.getElementById("score");
    score.innerHTML = Math.ceil(scoreGame);
    this.element.style.left = this.x + "px";
    if (this.x > 600 || this.x < 0) {
      gameOver();
    }
  };
  this.moveLeft = function() {
    this.x -= 180;
    if (this.x < 70) {
      this.x = 70;
    }
  };
  this.moveRight = function() {
    this.x += 180;
    if (this.x > 430) {
      this.x = 430;
    }
  };
  this.gameOver = function() {
    alert("Game Over");
     clearInterval(updateInterval);
     clearInterval(createObsInterval);
    this.y=0;
  };
}

carDiv = document.getElementById("car");
trackDiv = document.getElementById("track");
gameoverScreen=document.getElementById('gameoverScreen');

var car = new Car(carDiv, trackDiv);

var updateInterval=setInterval(function() {
  car.updatePosition();
}, 10);
document.onkeydown = function(event) {
  if (event.keyCode == 37) {
    car.moveLeft();
  }
  if (event.keyCode == 39) {
    car.moveRight();
  }
};
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function Obstacle() {
  this.y = 0;
  var that = this;
  this.x = 0;

  Obstacle.possibleX = [60, 249, 429];
  var lane = getRandomInt(0, 2);
  this.x = Obstacle.possibleX[lane];
  this.obstacle = document.createElement("img");
  this.obstacle.style.height = "136px";
  this.obstacle.style.width = "75px";
  this.obstacle.style.position = "absolute";
  this.possibleImages = [
    "images/cars_mini1.png",
    "images/cars_mini2.png",
    "images/cars_mini3.png",
    "images/cars_mini4.png"
  ];
  this.carType = this.possibleImages[getRandomInt(0, 3)];
  this.obstacle.src = this.carType;

  this.updatePosition = function() {
    this.y = this.y + 1;
    this.obstacle.style.top = this.y + "px";
    if (this.y > 500) {
      trackDiv.removeChild(this.obstacle);
      obstacles = obstacles.splice(1);
    }
  };
  this.obstacle.style.paddingRight = getRandomInt(2, 10) + "px";

  this.obstacle.style.left = this.x + "px";
  this.obstacle.style.position = "absolute";
  trackDiv.appendChild(this.obstacle);
}
var obstacles = [];
function createObstacle(number = 1) {
  for (i = 0; i < number; i++) {
    obstacle = new Obstacle();
    obstacles.push(obstacle);
  }
}
var track = document.getElementById("track");

var collisionInterval=setInterval(function() {
  obstacles.forEach(function(obstacle) {
    obstacle.y += car.dy;

    if (obstacle.y > 300 && obstacle.x < car.x && obstacle.x + 80 > car.x) {
      this.obstacle.src = "images/boom.png";
      console.log(obstacle);
      trackDiv.removeChild(car.element);
      obstacles = obstacles.splice(1);
      car.gameOver();
      
     
      // trackDiv.style.display="none";
      gameoverScreen.style.display="block";
    }

    obstacle.updatePosition();
  });
}, 50);

var createObsInterval=setInterval(createObstacle, 3000);
