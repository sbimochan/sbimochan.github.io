class World {
  constructor(elem) {
    this.x = 1;
    this.dx = 2;
    this.worldElement = elem;
    this.height = 504;
  }
  gameLoop() {
    let pipes = [];
    this.score = 0;
    let bird = new Bird(elem);
    this.updateInterval = setInterval(() => {
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
        if (pipe.pipeX + pipe.pipeWidth < bird.x && !pipe.isCrossed) {
          this.score++;
          pipe.isCrossed = true;
        }
        if (pipe.pipeX < bird.x + bird.width && pipe.pipeX + pipe.pipeWidth > bird.x) {
          //for top
          if (pipe.topHeight > bird.y) {

            gameOver();
          }
          if (world.height - pipe.bottomHeight < bird.y + bird.height) {

            gameOver();
          }
        }
      });
    }, 10);

    this.birdPos = setInterval(() => {
      bird.newPosition(true);
    }, 20);

    let dx = 2;
    let position = 0;
    this.scoreDiv = document.createElement('div');
    this.scoreDiv.style.position = "absolute";
    this.scoreDiv.style.color = "white";
    this.scoreDiv.style.fontSize = "40px";
    elem.appendChild(this.scoreDiv);
    document.onkeydown = (event) => {
      if (event.keyCode == 32) {
        bird.newPosition(false); //false to go up

      }
    }
  }
  updatePosition() {

    this.scoreDiv.innerHTML = world.score;
    this.x -= this.dx;
    this.worldElement.style.backgroundPositionX = this.x + "px";
    return this.x;
    // console.log(this.worldElement);
  }

}