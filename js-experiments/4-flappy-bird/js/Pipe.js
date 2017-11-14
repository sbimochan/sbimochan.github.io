class Pipe {
  constructor() {
    this.isCrossed =false;
    this.pipeX = 900;
    this.pipeHeight = 150;
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
    this.pipeX -= world.dx;
    this.drawPipe();
  }
}