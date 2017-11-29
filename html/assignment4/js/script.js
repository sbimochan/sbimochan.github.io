
let imageViewer = document.getElementsByClassName('slider-images');
let imageContainer = document.createElement('ul');
let slideLeft = document.getElementById('slideLeft');
let slideRight = document.getElementById('slideRight');
let carouselIndicator = document.getElementsByClassName('carousel-indicators');
let carouselIndicatorLi= document.getElementsByClassName('custom-indicator');
//image urls
let sliderImages = ['images/slider1.jpg', 'images/slider2.jpg', 'images/slider3.jpg', 'images/slider4.jpg', 'images/slider5.jpg'];
imageViewer[0].appendChild(imageContainer);
imageViewer[0].style.overflow = "hidden";
imageViewer[0].style.liststyle="none";
imageViewer[0].style.position="relative";
imageContainer.style.position="absolute";
imageContainer.style.width=1170*sliderImages.length+"px"; //width of image times number of slides

//counter
let imgNumber =0;
let addImg = function(imgName){
  let image = document.createElement('img');
  image.src = imgName;
  let list = document.createElement('li');
  list.style.display = 'inline-block';
  list.appendChild(image);
  imageContainer.appendChild(list);
}
for(let i = 0;i<sliderImages.length;i++){
  addImg(sliderImages[i]);
}

let prevStopper = null;

function animateNext(percent){
  // if(prevStopper){
  //   return;
  // }
  prevStopper = setInterval(function () {
    percent -= 2.5;
    
    // console.log('next', percent);
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
let flag = true;
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
    let percent = -(imgNumber-1)*100;
    switch (percent) {
      
      case -0:
      carouselIndicatorLi[0].style.backgroundColor="#B0B8B9";
        carouselIndicatorLi[1].style.backgroundColor="red";
        break;
      case -100:
        carouselIndicatorLi[1].style.backgroundColor="#B0B8B9";
        carouselIndicatorLi[2].style.backgroundColor="red";
      break;
      case -200:
      carouselIndicatorLi[2].style.backgroundColor="#B0B8B9";
        carouselIndicatorLi[3].style.backgroundColor="red";
      break;
      
      default:
        carouselIndicatorLi[3].style.backgroundColor="#B0B8B9";
        carouselIndicatorLi[4].style.backgroundColor="red";
      
        break;
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
    let percent = -(imgNumber+1)*100;
    // console.log('prev', percent);

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
let relatedPreview = document.getElementsByClassName('related-preview');
let relatedImageUl = document.getElementsByClassName('related-image-ul');
relatedPreview[0].style.position = "relative";
relatedPreview[0].style.overflow="hidden";
relatedImageUl[0].style.width=(1170*4)/16+"em";
relatedImageUl[0].style.position="absolute";
