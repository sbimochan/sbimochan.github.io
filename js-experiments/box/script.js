// var wrapper=document.getElementById('wrapper');
// // var mainWrapper=document.getElementById('main-wrapper');

// var snake=document.createElement('div');
// snake.style.width="20px";
// snake.style.height="20px";
// snake.style.background="red";
// snake.style.position="absolute";

// wrapper.appendChild(snake);

function Box(elementId) {
    this.moveDown = function() {
        this.dx = 0;
        this.dy = 5;

    }
    this.moveLeft = function() {
        this.dx = -5;
        this.dy = 0;
    }
    this.moveRight = function() {
        this.dx = 5;
        this.dy = 0;
    }
    this.moveUp = function() {
        this.dy = -5;
        this.dx = 0;
    }
    this.element = document.getElementById(elementId);
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;

    this.updatePosition = function() {
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
        if (this.x > 80 || this.y > 80) {
            this.x == 0;
            this.y == 0;
        }
        this.element.style.top = this.y + "px";
        this.element.style.left = this.x + "px";

    }
}

var box = new Box("box");
setInterval(function() {
    box.updatePosition();

}, 100);
document.onkeydown = function(event) {
    // console.log(event.keyCode);
    // if(event.keyCode==40){
    // 	// console.log("abcd");
    // 	box.moveDown();
    // }
    switch (event.keyCode) {

        case 37:
            box.moveLeft();
            break;
        case 38:
            box.moveUp();
            break;
        case 39:
            box.moveRight();

            break;
        default:
            box.moveDown();
    }
}