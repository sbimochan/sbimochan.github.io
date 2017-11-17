// let audio = new Audio("tones/Classical_guitar_scale.ogg");
// function playScale(){
//   audio.play();
// }
// function stopScale(){
//   audio.pause();
// }

// var context = new (window.AudioContext || window.webkitAudioContext)();

// var oscillator = context.createOscillator();

// oscillator.type = "sine";
// oscillator.frequency.value = 440;
// oscillator.connect(context.destination);
// oscillator.start();



let context = new AudioContext();
let o = context.createOscillator();
let g = context.createGain();
let filter = context.createBiquadFilter();


o.type="square";;
g.type="sine"; //it can be sine,square,triangle,sawtooth
o.connect(context.destination);
filter.type=filter.lowpass;
filter.frequency.value=440;
filter.connect(context.destination);
// o.connect(g);
// g.connect(context.destination);
// g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.04);

function playScale() {
  // o.start();
  filter.start();
}
function stopScale() {
  o.stop();
}
function gainScale(){

}
let sounds = [
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/G4.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/A4.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/C5.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/D5.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/E5.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/G5.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/A5.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/C6.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/D6.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/D%236.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/E6.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/G6.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/A6.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/C7.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/D7.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_G4.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_A4.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_C5.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_D5.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_E5.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_G5.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_A5.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_C6.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_D6.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_D%236.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_E6.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_G6.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_A6.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_C7.mp3",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/355309/d_D7.mp3"
];