var mainWrapper = document.getElementById('wrapper');
var imageContainer = document.createElement('ul');
var imageViewer = document.createElement("div");
imageViewer.id="container";

var posLeft = 0;

mainWrapper.appendChild(imageViewer);
var next = document.getElementById('next');
var prev = document.getElementById('prev');

imageViewer.appendChild(imageContainer);
imageViewer.style.width = "960px";
imageViewer.style.height = "420px";
imageViewer.style.overflow = "hidden";
imageViewer.style.liststyle = "none";
imageViewer.style.position = "relative";
imageContainer.style.position = "absolute";
imageContainer.style.width = "4000px";

/*Counter*/
var imgNumber = 0;

// images url

var images = ["images/image-slider-1.jpg", "images/image-slider-2.jpg", "images/image-slider-3.jpg", "images/image-slider-4.jpg"];

/*function for adding images from array*/
var addImg = function(imgName) {
    var image = document.createElement('img');
    image.src = imgName;
    var list = document.createElement('li');
    list.style.display = "inline-block";
    list.appendChild(image);
    imageContainer.appendChild(list);

}
//add image to loop
for (var x = 0; x < images.length; x++) {
    addImg(images[x]);
}
//function for setting image loop---------------------------------------------------------------------
function check(value) {
    if (value > 3) {
        return 0;
    }

    if (value < 0) {
        return 3;
    }

    return value;
}

function animateNext(percent) {

    var stopper = setInterval(function() {
        percent -= 2.5;
        console.log('next', percent);
        imageContainer.style.left = percent + "%";
        if (Math.abs(percent % 100) == 0) {
            clearInterval(stopper);
        }
    }, 25);
}

function animatePrev(percent) {
    var stopper = setInterval(function() {
        percent += 2.5;
        console.log('prev', percent);
        imageContainer.style.left = percent + "%";
        if (Math.abs(percent % 100) == 0) {
            clearInterval(stopper);
        }
    }, 25);
}
//function to prevent more than one click---------------------------------------------------------------------------------
var flag = true;

function preventClick() {
    setTimeout(function() {
        flag = true;
    }, 1000);
}
next.onclick = function() {
    if (flag == true) {
        flag = false;

        imgNumber++; //2
        imgNumber = check(imgNumber);
        var percent = -(imgNumber - 1) * 100;
        console.log('newnext', imgNumber);   
        animateNext(percent);
        preventClick();
    }
}
prev.onclick = function() {
    if (flag == true) {
        flag = false;
        imgNumber--;
        imgNumber = check(imgNumber);
        var percent = -(imgNumber + 1) * 100;
        animatePrev(percent);
        preventClick();
    }
}