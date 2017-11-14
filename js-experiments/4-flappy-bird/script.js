let mainBody = document.getElementsByTagName('body');
class World {
  constructor(elem) {
    this.x = 1;
    this.dx = 2;
    this.worldElement = elem;
    this.height = 504;
  }
  updatePosition() {

    this.x -= this.dx;
    this.worldElement.style.backgroundPositionX = this.x + "px";
    return this.x;
    // console.log(this.worldElement);
  }
  gameOver() {
    let gameOver = document.createElement('div');
    gameOver.style.width = "900px";
    gameOver.style.height = "504px";
    gameOver.style.background = "black";
    gameOver.style.position = "absolute";
    gameOver.style.top = "0";
    gameOver.style.left = "225px";
    gameOver.style.zIndex = "10";
    gameOver.style.opacity = "0.8";

    mainBody[0].appendChild(gameOver);

    let gameOverText = document.createElement('div');
    gameOverText.style.color = "white";
    gameOverText.innerHTML = "Game Over";
    gameOverText.style.fontSize = "85px";
    gameOverText.style.textAlign = "center";
    gameOver.appendChild(gameOverText);

    let playAgainBtn = document.createElement('button');
    playAgainBtn.innerHTML = "Play Again";
    playAgainBtn.style.padding = "20px";
    playAgainBtn.style.top = "300px";
    playAgainBtn.style.left = "385px";
    playAgainBtn.style.position = "absolute";
    gameOver.appendChild(playAgainBtn);

    playAgainBtn.onclick = function () {
      location.reload();
    }
    document.onkeydown = (event) => {
      if (event.keyCode == null) {
        bird.newPosition(false); //false to go up

      }
    }
  }


}
class Bird {
  constructor(elem) {
    this.x = 150;
    this.y = 0;
    this.birdElement = document.createElement("div");
    this.birdElement.id = "bird";
    this.width = 34;
    this.height = 24;
    // this.birdElement.src = "images/bird.png";
    this.birdElement.style.backgroundImage = "url(images/bird.png)";
    this.birdElement.style.top = "220px";
    this.birdElement.style.left = "150px";
    this.birdElement.style.width = "34px"; //70
    this.birdElement.style.height = "24px"; //50
    this.birdElement.style.position = "absolute";
    elem.appendChild(this.birdElement);
    this.gravity = 2.5;
    this.initialPosition = 220;
  }
  draw() {
    this.birdElement.style.top = this.y + 'px';
  }

  newPosition(goDown) {
    if (goDown) {
      this.y += this.gravity;
      // console.log(this.topPosition); draw(this.topPosition);
      this.draw();
      if (this.y > 480) {
        clearInterval(birdPos);
        clearInterval(updateInterval);

      }
    } else {
      this.y -= this.gravity * 15; // this value should be more
      this.draw();
    }
  }
}
class Pipe {
  constructor() {
    this.pipeX = 900;
    this.pipeHeight = 90;
    this.pipeWidth = 32;
    this.padding = 80;
    this.constraint = world.height - this.pipeHeight - this.padding * 2;
    this.topHeight = Math.floor(Math.random() * this.constraint + this.padding);
    this.bottomHeight = world.height - this.pipeHeight - this.topHeight;
    // this.pipeDiv.style.right=100+"px"; creating pipe Container
    this.pipeDiv = document.createElement("div");
    this.pipeDiv.className = "pipe";
    this.pipeDiv.style.left = "900px";
    elem.appendChild(this.pipeDiv);
    //crete upper pipe
    this.upperPipeDiv = document.createElement("div");
    this.upperPipeDiv.className = "pipe_upper";
    this.upperPipeDiv.style.height = this.topHeight + "px";
    this
      .pipeDiv
      .appendChild(this.upperPipeDiv);
    //creating lower pipe
    this.lowerPipeDiv = document.createElement("div");
    this.lowerPipeDiv.className = "pipe_lower";
    this.lowerPipeDiv.style.height = this.bottomHeight + "px";
    this
      .pipeDiv
      .appendChild(this.lowerPipeDiv);

  }
  drawPipe() {
    this.pipeDiv.style.left = this.pipeX + 'px';
    // console.log('sy',this.pipeX);
  }

  updatePipes() {
    // this.pipeDiv.style.left = parseInt(this.pipeDiv.style.left) - dx + 'px';
    this.pipeX -= dx;
    this.drawPipe();
  }
}



let pipes = [];
let elem = document.getElementById("bg");
let world = new World(elem);


let updateInterval = setInterval(() => {
  world.updatePosition();
  if (world.updatePosition() % 155 == 0) {
    // console.log(world.updatePosition());
    let pipe = new Pipe;

    pipes.push(pipe);
    // pipe.createPipes();
  }
  pipes.forEach((pipe) => {

    pipe.updatePipes();
    if (pipe.pipeDiv.style.left < 0 + "px") {

      elem.removeChild(pipe.pipeDiv);
      pipes.splice(0, 1);

    }

    if (pipe.pipeX < bird.x + bird.width && pipe.pipeX + pipe.pipeWidth > bird.x) {

      //for top
      if (pipe.topHeight > bird.y) {
        clearInterval(birdPos);
        clearInterval(updateInterval);
        world.gameOver();

      }
      if (504 - pipe.bottomHeight < bird.y + bird.height) {
        clearInterval(birdPos);
        clearInterval(updateInterval);
        world.gameOver();
      }

    }

  });

}, 10);


let bird = new Bird(elem);
let birdPos = setInterval(() => {
  bird.newPosition(true);
}, 20);

let dx = 2;
let position = 0;


document.onkeydown = (event) => {
  if (event.keyCode == 32) {
    bird.newPosition(false); //false to go up

  }
}



//gameover---------------------------------------------------------------



// console.log(createPipeInterval);