
function World(){
  this.wrapper = document.createElement("div");
  this.wrapper.style.width = "1000px";
  this.wrapper.style.height = "600px";
  this.wrapper.style.position = "relative";
  this.wrapper.style.backgroundImage="url(carpet3.jpg)";
  this.wrapper.style.backgroundRepeat="repeat";
  this.wrapper.style.display = "none";
  document.body.appendChild(this.wrapper);

  //game start
  this.gameMenuWrapper = document.createElement("div");
  this.gameMenuWrapper.style.backgroundColor = "aqua";
  this.gameMenuWrapper.style.width = "900px";
  this.gameMenuWrapper.style.height = "600px";
  this.gameMenuWrapper.style.fontWeight = "600";
  this.gameMenuWrapper.style.display="block";
  this.gameMenuWrapper.innerHTML = "Ant smasher!";
  this.gameMenuWrapper.textAlign = "center";
  document.body.appendChild(this.gameMenuWrapper);

  //play button
  var playBtn = document.createElement("button");
  playBtn.style.fontSize = "20px";
  playBtn.style.borderRadius = "7px";
  playBtn.style.padding = "20px";
  playBtn.style.boxShadow = "10px 10px 5px #888888 ";
  playBtn.innerHTML = "Start Game";
  this.gameMenuWrapper.appendChild(playBtn);
 

  //game over wrapper
  this.gameOverWrapper = document.createElement("div");
  this.gameOverWrapper.style.backgroundColor = "orange";
  this.gameOverWrapper.style.width = "1000px";
  this.gameOverWrapper.style.height = "600px";
  this.gameOverWrapper.style.display="block";
  this.gameOverWrapper.style.fontWeight = "600";
  this.gameOverWrapper.innerHTML = "Congratulation! You've smashed all ants";
  this.gameOverWrapper.textAlign = "center";
  document.body.appendChild(this.gameOverWrapper);

  //play button
  var playBtnAgain = document.createElement("button");
  playBtnAgain.style.fontSize = "20px";
  playBtnAgain.style.borderRadius = "7px";
  playBtnAgain.style.padding = "20px";
  playBtnAgain.style.boxShadow = "10px 10px 5px #888888 ";
  playBtnAgain.innerHTML = "Play Again";
  this.gameOverWrapper.appendChild(playBtnAgain);

  var that = this;
  const antGroup = [];
  //play btn function
  playBtn.onclick=function(){
    that.gameMenuWrapper.style.display="none";
    that.gameOverWrapper.style.display="none";
    that.wrapper.style.display="block";
    that.start();
  };
  playBtnAgain.onclick=function(){
    that.gameOverWrapper.style.display="none";
    that.gameMenuWrapper.style.display="block";
    that.wrapper.style.display="none";
  };
  this.start = function(){
    // console.log("started game");
    var tempWrapper=document.createElement('div');
    tempWrapper.style.width="100%";
    tempWrapper.style.height="500px";
    tempWrapper.style.position="relative";

    this.wrapper.appendChild(tempWrapper);
    
    for(i=0;i<5;i++){
      var ant=document.createElement('div');
      ant.style.height=antHeight+"px";
      ant.style.width=antWidth+"px";
      ant.style.backgroundImage="url(ant.png)";
      ant.style.position="absolute";
      tempWrapper.appendChild(ant);
      antGroup.push(new Ant(ant));

      ant.onclick=(function(selectedAnt){
        return function(){
          
          selectedAnt.killAnt();
          antGroup.splice(antGroup.indexOf(selectedAnt),1);
          this.onclick=null;
        };

      })(antGroup[i]); //callback
    }
    this.beginInterval(antGroup,tempWrapper);
  };

  //setInterval
  this.beginInterval=function(antGroup,tempWrapper){
    var flag=setInterval(function(){
      collisionDetection(antGroup);
      for(var i=0;i<antGroup.length;i++){
        antGroup[i].updatePosition();
      }
      if(antGroup.length==0){
        clearInterval(flag);
        that.gameOverWrapper.style.display="block";
        that.wrapper.removeChild(tempWrapper);
        that.wrapper.style.display="none";
      }
    },80);
  };
}
antHeight=37;
antWidth=50;
maxWidth=850;
maxHeight=600;
//Random number generator------------------------------------------------------------------------
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Ant(item){
  this.element=item;

  this.x=getRandomNumber(10,980);
  this.y=getRandomNumber(10,550);
  this.dx=getRandomNumber(-3,3);
  this.dy=getRandomNumber(-3,3);

  this.updatePosition=function(){
    this.boundryCheck();
    this.x=this.x+this.dx;
    this.y=this.y+this.dy;
    this.element.style.top=this.y+"px";
    this.element.style.left=this.x+"px";
  };

  this.killAnt = function(){
    this.element.style.backgroundImage="url('blood.png')";
    this.x=0;
    this.y=0;
  };
  this.boundryCheck=function(){
    if(this.x+antWidth>=maxWidth){
      this.dx=-this.dx;
    }else if(this.x<0){
      this.dx=-this.dx;
    }
    if(this.y+antHeight>=maxHeight){
      this.dy=-this.dy;
    }else if(this.y<0){
      this.dy=-this.dy;
    };
  }
}
var world = new World;
world.gameOverWrapper.style.display="none";


var collisionDetection=function(specifiedGroup){
  specifiedGroup.forEach(function(ant1){
    specifiedGroup.forEach(function(ant2){
      if(ant1==ant2){
        //do nothing
      }
      else{
        if(ant1.x+30 >ant2.x &&
          ant1.x<ant2.x+30 &&
          ant1.y+17 >ant2.y &&
          ant1.y<ant2.y+17
        ){
          if (ant1.x > ant2.x) {
            ant1.dx = Math.abs(ant1.dx);
            ant2.dx = -Math.abs(ant2.dx);
            if (ant1.y > ant2.y) {
              ant1.dy = Math.abs(ant1.dy);
              ant2.dy = -Math.abs(ant2.dy);
            } else {
              ant2.dy = Math.abs(ant2.dy);
              ant1.dy = -Math.abs(ant1.dy);
            }
          } else {
            ant2.dx = Math.abs(ant2.dx);
            ant1.dx = -Math.abs(ant1.dx);
            if (ant1.y > ant2.y) {
              ant1.dy = Math.abs(ant1.dy);
              ant2.dy = -Math.abs(ant2.dy);
            } else {
              ant2.dy = Math.abs(ant2.dy);
              ant1.dy = -Math.abs(ant1.dy);
            }
          }
        }
      }
    });
  });
}