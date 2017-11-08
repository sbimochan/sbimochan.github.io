var wrapper = document.getElementById("wrapper");
var box = document.createElement("div");

box.style.position = "relative";
box.id = "box";
box.style.width = "900px";
box.style.height = "800px";
box.style.background = "#567d46";
wrapper.appendChild(box);
var allAnts=[];
console.log(allAnts);
function Ant(antId){
	this.element=document.createElement('div');
	this.element.id=antId;
	this.element.style.width="140px";
	this.element.style.height="137px";
	this.element.style.backgroundImage="url(ant.gif)";
	this.element.style.position="absolute";
	this.element.style.top=getRandomInt(1,550)+"px";
	this.element.style.left=getRandomInt(1,550)+"px";
	box.appendChild(this.element);
	this.x=getRandomInt(0,550);
	this.y=getRandomInt(0,550);
	this.dx=getRandomInt(-5,5);
	this.dy=getRandomInt(-5.5);
	
	this.updatePosition=function(){
		this.x=this.x+this.dx;
		this.y=this.y+this.dy;

		this.element.style.top=this.y+"px";
		this.element.style.left=this.x+"px";

		if(this.x >=500){
			this.dx=-this.dx;
		}
		if(this.x <10){
			this.dx=-this.dx;
		}
		if(this.y>500){
			this.dy=-this.dy;
		}
		if(this.y<10){
			this.dy=-this.dy;
		}
	}

	this.element.onclick=function(){
		var blood=this;
		blood.style.backgroundImage="url(bloodstain.png)";
		blood.style.backgroundRepeat="no-repeat";
		setTimeout(function(){
			box.removeChild(blood);
		},300);
	}
	var that=this;
	setInterval(function(){
		allAnts.forEach(function(ant){

		ant.updatePosition();
		})
	},4000); 
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
for(var i=0;i<10;i++){
	var ant=new Ant("ant"+i);
	allAnts.push(ant);
}