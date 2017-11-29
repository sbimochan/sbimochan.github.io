
var slider = {
  0: {
    title: 'Donec faucibus ultricies congue',
    images: ['scene (1).jpeg','scene (2).jpeg','scene (3).jpeg','scene (4).jpeg']
  },
  1:{
    title:'Faucibus donec congue ultricies',
    images:['images/slider1.jpg', 'images/slider2.jpg', 'images/slider3.jpg', 'images/slider4.jpg', 'images/slider5.jpg']
  }
 
};
var sliderKeys = Object.keys(slider[0]);
console.log(sliderKeys);

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
    console.log('newnext', percent);
  
    animateNext(percent);
    preventClick();
    setSliderBtnActive();
  }
}
slideLeft.onclick = function(){
  if(flag ==true && imgNumber>0){
    flag = false;
    imgNumber--;
    // imgNumber = check(imgNumber);
    var percent = -(imgNumber+1)*100;
    
    animatePrev(percent);
    preventClick();
    setSliderBtnActive();
  }
}

//dynamic carousel indicators
// console.log(imgNumber);
for(var index=0;index<sliderImages.length;index++){
  carouselIndicatorLists = document.createElement('li');
  carouselIndicatorLists.className="custom-indicator";
  carouselIndicatorLists.setAttribute('id','sliderBtn'+index);
  carouselIndicator[0].appendChild(carouselIndicatorLists);
// console.log(imgNumber);
if(index ==imgNumber){
  carouselIndicatorLists.setAttribute('class','active');
}
  
}
//to highlight active indicator
function setSliderBtnActive(){
  for(var i=0;i<sliderImages.length;i++){
    var tempBtn = document.getElementById('sliderBtn'+i);
    if(i==imgNumber){
      tempBtn.setAttribute('class','active');
    }
    else{
      tempBtn.setAttribute('class','carousel-indicator');
    }
  }
}
 for(var i=0;i<sliderImages.length;i++) {
    var tempBtn = document.getElementById('sliderBtn'+i);
    tempBtn.onclick = function (i) {
      return function () {
        changeSliderImage(i);
      }
    }(i);
  }

  function changeSliderImage(index){
    imgNumber = index;
    imageContainer.style.left = -(100*index) + "%";
    setSliderBtnActive();
  }

//related images slider
var relatedPreview = document.getElementsByClassName('related-preview');
var relatedImageUl = document.getElementsByClassName('related-image-ul');

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

// if(imgNumber==0){
//   carouselIndicatorLi[0].style.backgroundColor="#E2534B";
// }