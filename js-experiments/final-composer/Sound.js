class Sound {
  constructor(context) {
    this.context = context; //feed AudioContext. webkit AudioContext for Safari
  }
  init() {
    this.oscillator = this.context.createOscillator(); //for electronic math sound

    this.gainNode = this.context.createGain(); //for gain

    this.oscillator.connect(this.gainNode); //transferring to speakers
    this.gainNode.connect(this.context.destination);
    this.oscillator.type = "traingle"; //could be waveforms like sine,square,triangle,sawtooth
  }
  // init();
  //Creating play method
  play(hertz, time, cents) {
    //generate tone eg play(261.63, now);

    this.init();
    this.oscillator.frequency.value = hertz;
    this.oscillator.detune.value = cents;
    this.gainNode.gain.setValueAtTime(1, this.context.currentTime); //currentTime is 2x accurate than Date
    this.oscillator.start(time);
    this.stop(time);
  }
  stop(time) {
    this.gainNode.gain.exponentialRampToValueAtTime(0.01, time + 1);
    this.oscillator.stop(time + 1);
  }
}
let context = new (window.AudioContext || window.webkitAudioContext)();
let note = new Sound(context);
// note.init();

// note.play(261.63, now + 2);
// note.play(293.66, now + 2 + 0.5);
// note.play(329.63, now + 2 + 1);
// note.play(349.23, now + 2 + 1.5);
// note.play(392.0, now + 2 + 2);
// note.play(440.0, now + 2 + 2.5);
// note.play(493.88, now + 2 + 3);
// note.play(523.25, now + 2 + 3.5);
function playScale() {
  let now = context.currentTime;
  // console.log("played")
  note.play(getFrequency(), now, -798);
  // note.play(261.63, now + 2);
  // note.play(293.66, now + 2 + 0.5);
  // note.play(329.63, now + 2 + 1);
  // note.play(349.23, now + 2 + 1.5);
  // note.play(392.0, now + 2 + 2);
  // note.play(440.0, now + 2 + 2.5);
  // note.play(493.88, now + 2 + 3);
  // note.play(523.25, now + 2 + 3.5);
}
function stopScale() {
  note.stop(0);
}
// let hertz = {
//   C4: 261.63,
//   D4: 293.66,
//   E4: 329.63,
//   F4: 349.23,
//   G4: 392.0,
//   A4: 440.0,
//   B4: 493.88
// };

let toneSelector = document.getElementById("noteId");
let composedNotes = [];

function collectNotes(){
    let note = toneSelector.options[toneSelector.selectedIndex].value;
    composedNotes.push(note);
    getFrequency();
    // console.log(composedNotes);
}
function getFrequency() {
  
  composedNotes.forEach(function(composedNote){
    // console.log(composedNote);
    let hertzValue = hertz[composedNote];
    // console.log('hertzvalue',hertzValue);
    
    return hertzValue;
  });
}
  
// function playScale(){
//   let now = context.currentTime;
//   note.play(hertzValue, now+1, -798);
  
   console.log("frequency",getFrequency());
//   //  console.log(hertzFinder());
// }

// setInterval(playScale, 1000);

// class Section{
//   constructor(){
//     this.noteValue = noteValue;

//   }
// }
// setTimeout(playScale,3000);
