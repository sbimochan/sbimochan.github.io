class World {
  constructor(elem) {
    this.x = 1;
    this.dx = 2;
    this.worldElement = elem;
  }
  updatePosition() {
    this.x += this.dx;
    this.worldElement.style.backgroundPositionX = "right " + this.x + "px";
  }
}
let elem = document.getElementById("bg");
let world = new World(elem);
let updateInterval = setInterval(function() {
  world.updatePosition();
}, 10);

class Bird {
  constructor(elem) {
    this.birdElement = document.createElement("img");
    this.birdElement.src = "images/bird.png";
    this.birdElement.style.top = "220px";
    this.birdElement.style.height = "100px";
    this.birdElement.style.width = "100px";
    this.birdElement.style.position = "absolute";
    elem.appendChild(this.birdElement);
  }
}
let bird = new Bird(elem);
