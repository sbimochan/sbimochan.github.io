var next = document.getElementById('next');
var prev = document.getElementById('prev');
var images = document.getElementsByClassName('img');
// alert(images.length);
// console.log(images);
var i = 1;
for (var j = 1; j <= images.length; j++) {
    var className = "img" + j;
    // console.log(className);
    var className = document.getElementsByClassName(className);
    // console.log(className);
    className.style.zindex="1";
}
    next.onclick = function() {
        // z-index=i++;
        // console.log(className);
    }