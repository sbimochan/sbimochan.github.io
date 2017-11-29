
var imageViewer = document.getElementsByClassName('slider-images');
var imageContainer = document.createElement('ul');
var slideLeft = document.getElementById('slideLeft');
var slideRight = document.getElementById('slideRight');
var carouselIndicator = document.getElementsByClassName('carousel-indicators');
var carouselIndicatorLi= document.getElementsByClassName('custom-indicator');
//image urls
var sliderImages = ['images/slider1.jpg', 'images/slider2.jpg', 'images/slider3.jpg', 'images/slider4.jpg', 'images/slider5.jpg'];
imageViewer[0].appendChild(imageContainer);
imageViewer[0].style.overflow = "hidden";
imageViewer[0].style.liststyle="none";
imageViewer[0].style.position="relative";
imageContainer.style.position="absolute";
imageContainer.style.width=(1170*sliderImages.length)/16+"em"; //width of image times number of slides
imageContainer.style.height=700/16+'em';
//counter
var imgNumber =0;
var addImg = function(imgName){
  var image = document.createElement('img');
  image.src = imgName;
  var list = document.createElement('li');
  list.style.display = 'inline-block';
  
  list.appendChild(image);
  imageContainer.appendChild(list);
}
for(var i = 0;i<sliderImages.length;i++){
  addImg(sliderImages[i]);
}

var prevStopper = null;

function animateNext(percent){

  prevStopper = setInterval(function () {
    percent -= 2.5;

    imageContainer.style.left = percent + "%";
    if (Math.abs(percent % 100) == 0) {
      clearInterval(prevStopper);
      prevStopper = null;
    }
  }, 25);
  console.log(percent);
}

function animatePrev(percent) {
  // if (prevStopper) {
  //   return;
  // }
  prevStopper = setInterval(function () {
    percent += 2.5;
    if (percent == -400) {
      slideLeft.addEventListener('click', function(event){
        event.preventDefault();
      })
    }
    // console.log('prev', percent);
    imageContainer.style.left = percent + "%";
    if (Math.abs(percent % 100) == 0) {
      clearInterval(prevStopper);
      prevStopper = null;
    }
  }, 25);
  console.log(percent);
}

//function to prevent more than one click
var flag = true;
function preventClick(){
  setTimeout(function(){
    flag = true;
  },1000); 
}

slideRight.onclick = function(){
  if(flag ==true && imgNumber<4){
    flag =false;
    imgNumber++;
    // imgNumber = check(imgNumber);
    var percent = -(imgNumber-1)*100;
    
    switch (percent) {
      
      case -0:
      carouselIndicatorLi[0].style.backgroundColor="#B0B8B9";
        carouselIndicatorLi[1].style.backgroundColor="#E2534B";
        break;
      case -100:
        carouselIndicatorLi[1].style.backgroundColor="#B0B8B9";
        carouselIndicatorLi[2].style.backgroundColor="#E2534B";
      break;
      case -200:
      carouselIndicatorLi[2].style.backgroundColor="#B0B8B9";
        carouselIndicatorLi[3].style.backgroundColor="#E2534B";
      break;
      
      case -300:
        carouselIndicatorLi[3].style.backgroundColor="#B0B8B9";
        carouselIndicatorLi[4].style.backgroundColor="#E2534B";
      
    }
    console.log('newnext', percent);
  
    animateNext(percent);
    preventClick();

  }
}
slideLeft.onclick = function(){
  if(flag ==true && imgNumber>0){
    flag = false;
    imgNumber--;
    // imgNumber = check(imgNumber);
    var percent = -(imgNumber+1)*100;
    // console.log('prev', percent);
    switch (percent) {
      
      case -100:
      carouselIndicatorLi[1].style.backgroundColor="#B0B8B9";
        carouselIndicatorLi[0].style.backgroundColor="#E2534B";
        break;
      case -200:
        carouselIndicatorLi[2].style.backgroundColor="#B0B8B9";
        carouselIndicatorLi[1].style.backgroundColor="#E2534B";
      break;
      case -300:
      carouselIndicatorLi[3].style.backgroundColor="#B0B8B9";
        carouselIndicatorLi[2].style.backgroundColor="#E2534B";
      break;
      
      case -400:
        carouselIndicatorLi[4].style.backgroundColor="#B0B8B9";
        carouselIndicatorLi[3].style.backgroundColor="#E2534B";
    }
    animatePrev(percent);
    preventClick();
 
  }
}
console.log(imgNumber);

//dynamic carousel indicators
// console.log(imgNumber);
for(i=0;i<sliderImages.length;i++){
  carouselIndicatorLists = document.createElement('li');
  carouselIndicatorLists.className="custom-indicator";
  carouselIndicator[0].appendChild(carouselIndicatorLists);
}

//related images slider
var relatedPreview = document.getElementsByClassName('related-preview');
var relatedImageUl = document.getElementsByClassName('related-image-ul');
// relatedPreview[0].style.position = "relative";
// relatedPreview[0].style.overflow="hidden";
// relatedImageUl[0].style.width=(1170*4)/16+"em";
// relatedImageUl[0].style.position="absolute";

var projectNext = document.getElementById('projectNext');
var projectSlider = document.getElementById('projectSlider');
var projectPrevious = document.getElementById('projectPrevious');

var opacityInterval = function() {};
var projectSliderPosition = 1;
var projectCanSlide = false;
var FADE_DURATION = 20;
var TOTAL_PROJECTS_PER_ROW = 4;
slideProject(projectSliderPosition);

function slideProject(position) {
  for (var i = 0, sliderLength = projectSlider.children.length; i < sliderLength; i+=TOTAL_PROJECTS_PER_ROW) {
    var opacity = 0;
    if (position === (i / TOTAL_PROJECTS_PER_ROW + 1)) {
      opacityInterval = setInterval(fadeIn(i, opacity), FADE_DURATION);
    } else {
      setTimeout(fadeOut(i), FADE_DURATION);
    }
  }
  setProjectSliderMargin();
}

function fadeIn(i, opacity) {
  return function() {
    if (projectSlider.children.hasOwnProperty(i)) {
      projectSlider.children[i].style.display = 'list-item';
      projectSlider.children[i].style.opacity = opacity;
    }
    if (projectSlider.children.hasOwnProperty(i + 1)) {
      projectSlider.children[i + 1].style.display = 'list-item';
      projectSlider.children[i + 1].style.opacity = opacity;
    }
    if (projectSlider.children.hasOwnProperty(i + 2)) {
      projectSlider.children[i + 2].style.display = 'list-item';
      projectSlider.children[i + 2].style.opacity = opacity;
    }
    if (projectSlider.children.hasOwnProperty(i + 3)) {
      projectSlider.children[i + 3].style.display = 'list-item';
      projectSlider.children[i + 3].style.opacity = opacity;
    }
    opacity += 1 / 100;
    if (Math.floor(opacity) > 1) {
      clearInterval(opacityInterval);
      projectCanSlide = true;
    }
  }
}

function fadeOut(i) {
  return function() {
    if (projectSlider.children.hasOwnProperty(i)) {
      projectSlider.children[i].style.opacity = '0';
      projectSlider.children[i].style.display = 'none';
    }
    if (projectSlider.children.hasOwnProperty(i + 1)) {
      projectSlider.children[i + 1].style.opacity = '0';
      projectSlider.children[i + 1].style.display = 'none';
    }
    if (projectSlider.children.hasOwnProperty(i + 2)) {
      projectSlider.children[i + 2].style.opacity = '0';
      projectSlider.children[i + 2].style.display = 'none';
    }
    if (projectSlider.children.hasOwnProperty(i + 3)) {
      projectSlider.children[i + 3].style.opacity = '0';
      projectSlider.children[i + 3].style.display = 'none';
    }
  }
}

function setProjectSliderMargin() {
  projectSlider.children[(projectSliderPosition - 1) * TOTAL_PROJECTS_PER_ROW].style.marginLeft = '0%';
  if (projectSlider.children.hasOwnProperty((projectSliderPosition - 1) * TOTAL_PROJECTS_PER_ROW + 3)) {
    projectSlider.children[(projectSliderPosition - 1) * TOTAL_PROJECTS_PER_ROW + 3].style.marginRight = '0%';
  }
}

projectPrevious.onclick = function() {
  if (projectCanSlide && ((projectSliderPosition - 1) * TOTAL_PROJECTS_PER_ROW > 0)) {
    projectCanSlide = false;
    slideProject(--projectSliderPosition);
  }
}

projectNext.onclick = function() {
  if (projectCanSlide && ((projectSliderPosition + 1) <= Math.ceil(projectSlider.children.length / TOTAL_PROJECTS_PER_ROW))) {
    projectCanSlide = false;
    slideProject(++projectSliderPosition);
  }
}
if(imgNumber==0){
  carouselIndicatorLi[0].style.backgroundColor="#E2534B";
}