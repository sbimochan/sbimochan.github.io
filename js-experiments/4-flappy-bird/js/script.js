elem = document.getElementById("bg");
let world = new World(elem);

//for play and restart
function gameLoop() {
  let pipes = [];
  
  let bird = new Bird(elem);
  let updateInterval = setInterval(() => {
    world.updatePosition();
    if (world.updatePosition() % 155 == 0) {
      let pipe = new Pipe;
      pipes.push(pipe);
    }
    pipes.forEach((pipe) => {

      pipe.updatePipes();
      if (pipe.pipeDiv.style.left < 0 + "px") {
        elem.removeChild(pipe.pipeDiv);
        pipes.splice(0, 1);
      }
      if (pipe.pipeX < bird.x) {
        
      }
      if (pipe.pipeX < bird.x + bird.width && pipe.pipeX + pipe.pipeWidth > bird.x) {
        //for top
        if (pipe.topHeight > bird.y) {
          clearInterval(birdPos);
          clearInterval(updateInterval);
          gameOver();
        }
        if (world.height - pipe.bottomHeight < bird.y + bird.height) {
          clearInterval(birdPos);
          clearInterval(updateInterval);
          gameOver();
        }
      }
    });
  }, 10);

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
}
//gameover---------------------------------------------------------------
function gameOver() {
  let mainBody = document.getElementsByTagName('body');
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
    // gameOver.style.display="none"; console.log(elem);
    while (elem.children[0]) 
      elem.removeChild(elem.children[0]);
    mainBody[0].removeChild(gameOver);
    gameOver.removeChild(playAgainBtn);
    // playAgainBtn.style.display="none";
    gameLoop();
  }
  document.onkeydown = (event) => {
    if (event.keyCode == null) {
      bird.newPosition(false); //false to go up

    }
  }
}

function startGame() {
  let elem = document.getElementById('bg');
  let playBtn = document.createElement('button');
  playBtn.innerHTML = "Play Again";
  playBtn.style.padding = "20px";
  playBtn.style.top = "300px";
  playBtn.style.left = "385px";
  playBtn.style.position = "absolute";
  elem.appendChild(playBtn);

  playBtn.onclick = function () {
    elem.removeChild(playBtn);
    gameLoop();
  }
}
startGame();