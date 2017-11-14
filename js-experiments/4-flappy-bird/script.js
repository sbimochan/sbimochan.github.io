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
  
}
let pipes = [];
let elem = document.getElementById("bg");
let world = new World(elem);
let updateInterval = setInterval(() => {
  world.updatePosition();
  if (world.updatePosition() % 275 == 0) {
    // console.log(world.updatePosition());
    let pipe = new Pipe;
    pipes.push(pipe);
    // pipe.createPipes();
  }
  pipes.forEach(function (pipe) {
    
    pipe.updatePipes();
  })
  
}, 10);

class Bird {
  constructor(elem) {
    this.birdElement = document.createElement("div");
    this.birdElement.id = "bird";
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
  newPosition(goUp) {
    let topPosition = parseInt(this.birdElement.style.top); //220 from 220px
    if (goUp) {
      topPosition += this.gravity;
      // console.log(topPosition);
      this.birdElement.style.top = topPosition + "px";
      if (topPosition > 480) {
        clearInterval(birdPos);
        clearInterval(updateInterval);
       
      }
    } else {
      topPosition -= this.gravity * 15; // this value should be more
      this.birdElement.style.top = topPosition + "px";
    }
  }
}
let bird = new Bird(elem);
let birdPos = setInterval(() => {
  bird.newPosition(true);
}, 20);

 let dx = 2;
 let position = 0;
class Pipe {
  constructor() {
    this.pipeHeight = 90;
    this.pipeWidth = 32;
    this.padding = 80;
    this.constraint = world.height - this.pipeHeight - this.padding * 2;
    this.topHeight = Math.floor(Math.random() * this.constraint + this.padding);
    this.bottomHeight = world.height - this.pipeHeight - this.topHeight;
    // this.pipeDiv.style.right=100+"px";
    //creating pipe Container
    this.pipeDiv = document.createElement("div");
    this.pipeDiv.className = "pipe";
    this.pipeDiv.style.left = "900px";
    elem.appendChild(this.pipeDiv);
    //crete upper pipe
    this.upperPipeDiv = document.createElement("div");
    this.upperPipeDiv.className = "pipe_upper";
    this.upperPipeDiv.style.height = this.topHeight + "px";
    this.pipeDiv.appendChild(this.upperPipeDiv);
    //creating lower pipe
    this.lowerPipeDiv = document.createElement("div");
    this.lowerPipeDiv.className = "pipe_lower";
    this.lowerPipeDiv.style.height = this.bottomHeight + "px";
    this.pipeDiv.appendChild(this.lowerPipeDiv);
  }

  updatePipes() {
   

 this.pipeDiv.style.left = parseInt(this.pipeDiv.style.left) - dx + 'px';
 }
}


document.onkeydown = (event) => {
  if (event.keyCode == 32) {
    bird.newPosition(false); //false to go up

  }
}


// console.log(createPipeInterval);