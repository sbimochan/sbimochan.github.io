var wrapper = document.getElementById("wrapper");
var box = document.createElement("div");
var ul=document.createElement("ul");
ul.style.paddingTop="502px";
box.appendChild(ul);
box.style.position = "relative";
box.id = "box";
box.style.width = "500px";
box.style.height = "500px";
box.style.background = "grey";
wrapper.appendChild(box);

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var data = [];
var top;
var left;
var i = 0;
do {
    _top = getRandomInt(1, 490);
    _left = getRandomInt(1, 490);
  
    var dict = {
        top: _top,
        left: _left
    }
    var stars = document.createElement("div");
    stars.id = "stars" + i;
    stars.className="stars";
    stars.style.width = "10px";
    stars.style.height = "10px";
    stars.style.position = "absolute";
    stars.style.background = "red";
    stars.style.top = getRandomInt(1, 490) + "px";
    stars.style.left = getRandomInt(1, 490) + "px";
    box.appendChild(stars);
    i++;
    data.push(dict);
    stars.onclick=function(){
    	var removed=box.removeChild(this);
    	var listElements = document.createElement("li");
    	ul.appendChild(listElements);
    	var __top=removed.style.getPropertyValue('top');
    	var __left=removed.style.getPropertyValue('left');
    	listElements.innerHTML = "top: "+__top+" left: "+__left; 
    }
} while (i < 20);

