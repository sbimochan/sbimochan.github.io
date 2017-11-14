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