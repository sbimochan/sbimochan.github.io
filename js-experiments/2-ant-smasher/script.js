var wrapper = document.getElementById("wrapper");
var box = document.createElement("div");
var playbtn=document.getElementById("play");
box.style.position = "relative";
box.id = "box";
box.style.width = "600px";
box.style.height = "600px";
box.style.background = "#567d46";
wrapper.appendChild(box);
var allAnts = [];
// var scoreNo = [];
var smashScore=0;
// console.log(allAnts);
var antAlive=0;



function triggerGame(){

    playbtn.style.display="none";
    function Ant(antId) {
    this.element = document.createElement('div');
    this.element.id = antId;
    this.element.className = "antClass";
    this.element.style.width = "50px";
    this.element.style.height = "37px";
    this.element.style.backgroundImage = "url(ant.png)";
    this.element.style.position = "absolute";
    this.element.style.top = getRandomInt(1, 550) + "px";
    this.element.style.left = getRandomInt(1, 550) + "px";
    box.appendChild(this.element);
    this.x = getRandomInt(0, 550);
    this.y = getRandomInt(0, 550);
    this.dx = getRandomInt(-2, 2);
    this.dy = getRandomInt(-2, 2);



    this.updatePosition = function() {
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;

        this.element.style.top = this.y + "px";
        this.element.style.left = this.x + "px";
        // console.log('left-coordinate',this.element.style.top);
        // console.log('right-coordinate',this.element.style.left);
        var leftCoordinate = this.element.style.left;
        var topCoordinate = this.element.style.top;
        // if(leftCoordinate==this.dx){
        //     console.log("collided");
        // }

        if (this.x >= 550) {
            this.dx = -this.dx;
        }
        if (this.x < 10) {
            this.dx = -this.dx;
        }
        if (this.y > 500) {
            this.dy = -this.dy;
        }
        if (this.y < 10) {
            this.dy = -this.dy;
        }
        // console.log('x',this.x);
        // console.log('y',this.y);
    }

    // var __ant = document.getElementsByClassName('antClass');

    
    this.element.onclick = function() {
        var blood = this;
        antAlive--;
        smashScore++;

        blood.style.backgroundImage = "url(blood.png)";
        blood.style.backgroundRepeat = "no-repeat";
        setTimeout(function() {
  
             box.removeChild(blood);
           
            document.getElementById('score').innerHTML = smashScore;
            if(antAlive==0){
                  var gameOver = document.getElementById("gameover");
            gameOver.style.display = "block";
            }
        }, 300);

    }
    var that = this;

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
for (var i = 0; i < 10; i++) {
    antAlive++;
    var ant = new Ant("ant" + i);
    allAnts.push(ant);

}
setInterval(function() {
    allAnts.forEach(function(ant) {
        collisionCheck();
        ant.updatePosition();
    })
}, 10);

var collisionCheck=function(){

    for(var i=0;i<allAnts.length;i++){
        for(var j=i;j<allAnts.length;j++){
            if(allAnts[i]===allAnts[j]){
                continue;
            }
            var topA=allAnts[i].y;

            // console.log('top',topA);
            // var bottomA=allAnts[i].y+allAnts[i].height;
             var bottomA=allAnts[i].y+50;
            var leftA=allAnts[i].x;
            var rightA=allAnts[i].x+37;
            // console.log('top',bottomA);

            var topB=allAnts[j].y;
            var bottomB=allAnts[j].y+50;
            var leftB=allAnts[j].x;
            var rightB=allAnts[j].x+37;
            if((rightA>leftB )&&(leftA<rightB)&&(bottomA>topB)&&(topA<bottomB)){
                // console.log('condition');
                // clearInterval(gameOver);
                allAnts[i].dx = allAnts[i].dx*-1;
                allAnts[j].dx = allAnts[j].dx*-1;
                allAnts[i].dy = allAnts[i].dy*-1;
                allAnts[j].dy = allAnts[j].dy*-1;
                // gameover=setInterval(gameLoop,100);
            }

        }
    }
}

}
function gameOver(){
    gameover.style.display="none";
    triggerGame();
}


document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        triggerGame();
    }
}
