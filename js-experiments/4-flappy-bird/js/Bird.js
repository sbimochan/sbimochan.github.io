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
       
        gameOver();
      }
    } else {
      this.y -= this.gravity * 15; // this value should be more
      this.draw();
    }
  }
}