carDiv = document.getElementById("car");
trackDiv = document.getElementById("track");
gameoverScreen = document.getElementById("gameoverScreen");

function Bullet(x) {
  //x=car X axis position
  this.left = x + 50 + "px";
  this.currentPosition = x;
  this.bulletElement = document.createElement("div");
  this.bulletElement.style.height = "40px";
  this.bulletElement.style.width = "8px";
  this.bulletElement.style.backgroundSize = "contain";

  this.bulletElement.style.backgroundImage = "url(images/bullet.png)";
  this.bulletElement.style.position = "absolute";
  this.bulletElement.style.zIndex = "2";
  this.bulletElement.style.left = this.left;
  this.y = 400;
  this.dy = 3;
  this.bulletElement.style.top = this.y + "px";
  this.bulletTravel = function() {
    this.bulletElement.style.top = bullet.y + "px";
  };
  var that = this;

  this.updatePosition = function() {
    this.y -= this.dy;
    this.bulletElement.style.top = this.y + "px";
  };
}

function Car(carDiv, track) {
  this.element = carDiv;
  this.track = track;
  this.x = 250;
  this.y = 0;
  this.dy = 5;
  this.updatePosition = function() {
    this.y = this.y + this.dy;
    this.track.style.backgroundPosition = "center " + this.y + "px";
    if (this.y == 10000) {
      document.getElementById("takeRest").innerHTML = "Give rest to your eyes";
    }
    scoreGame = this.y / 3000;
    var score = document.getElementById("score");
    score.innerHTML = Math.ceil(scoreGame);
    this.element.style.left = this.x + "px";
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

  this.shootBullet = function() {
    this.bullet = new Bullet(this.x);
    trackDiv.appendChild(this.bullet.bulletElement);
    return this.bullet;
  };
}

var gameOver = function(updateInterval, createObsInterval) {
  clearInterval(updateInterval);
  clearInterval(createObsInterval);
};

function gameLoop() {
  this.bullets = [];
  var that = this;
  var car = new Car(carDiv, trackDiv);
  var updateInterval = setInterval(function() {
    car.updatePosition();

    //bullet motion
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].updatePosition();
    }

    //check bullet out of screen
    if (this.bullets.length > 0) {
      if (this.bullets[0].y < 0) {
        trackDiv.removeChild(this.bullets[0].bulletElement);
        this.bullets.splice(this.bullets.indexOf(this.bullets[0]), 1);
      }
    }
  }, 10);
  document.onkeydown = function(event) {
    if (event.keyCode == 37) {
      car.moveLeft();
    }
    if (event.keyCode == 39) {
      car.moveRight();
    }
    if (event.keyCode == 32) {
      that.bullets.push(car.shootBullet());
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
      "images/cars_mini4.png",
      "images/boom.png"
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

  //colision
  var collisionInterval = setInterval(function() {
    obstacles.forEach(function(obstacle) {
      obstacle.y += car.dy;
      if (that.bullets.length > 0) {
        // console.log(parseInt(that.bullets[0].left)); 120,300,480
        // console.log(obstacle.x); 60,249,449
        if (
          that.bullets[0].y - 40 < obstacle.y &&
          obstacle.x < parseInt(that.bullets[0].left)
        ) {
          console.log("dhisum");
          bullets[0].bulletElement.style.display = "none";
          bullets = bullets.splice(1);
          obstacle.obstacle.src = "images/boom.png";
          obstacles = obstacles.splice(1);
          setTimeout(function() {
            obstacles = obstacles.splice(1);
            obstacle.obstacle.style.display = "none";
          }, 250);
        }
      }
      if (obstacle.y > 300 && obstacle.x < car.x && obstacle.x + 80 > car.x) {
        obstacle.obstacle.src = "images/boom.png";
        car.element.style.display = "none";
        obstacles = obstacles.splice(1);
        gameOver(updateInterval, createObsInterval);

        gameoverScreen.style.display = "block";
      }

      obstacle.updatePosition();
    });
  }, 50);
  var createObsInterval = setInterval(createObstacle, 3000);
}
var playBtn = document.getElementById("startGame");
var playAgainBtn = document.getElementById("playAgainBtn");
playBtn.onclick = function() {
  playBtn.style.display = "none";
  carDiv.style.display = "block";
  gameLoop();
};

playAgainBtn.onclick = function() {
  gameoverScreen.style.display = "none";
  carDiv.style.display = "block";
  obstacle.obstacle.style.display = "none";
  gameLoop();
};
