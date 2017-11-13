class World{
  constructor(x,dx){
    this.x=1;
    this.dx=2;
    this.worldElement=document.getElementById('bg');

    this.updatePosition = function(){
      this.x=this.x+this.dx;
      this.worldElement.style.backgroundPositionX="right "+this.x+"px";
    };    
  }
}
var world = new World;
var updateInterval=setInterval(function(){
  world.updatePosition();
},10);
