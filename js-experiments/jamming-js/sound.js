class Sound {
  constructor(context, waveform) {
    this.context = context; //feed AudioContext. webkit AudioContext for Safari
    this.waveform = waveform;
  }
  init() {
    this.oscillator = this.context.createOscillator(); //for electronic math sound
    this.gainNode = this.context.createGain(); //for gain
    this.analyser = this.context.createAnalyser();
    this.distortion = this.context.createWaveShaper();

    //connection to middle filters
    this.oscillator.connect(this.analyser);
    this.analyser.connect(this.distortion);
    this.distortion.connect(this.gainNode);
    this.gainNode.connect(this.context.destination);
    this.oscillator.type = waveform; //could be waveforms like sine,square,triangle,sawtooth
  }
  // init(); Creating play method
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
    this.gainNode.gain.exponentialRampToValueAtTime(0.1, time + 1);
    this.oscillator.stop(time + 1);
  }
  controlVolume(element){
    let volume = element.value;
    let fraction = parseInt(element.value) / parseInt(element.max); //using x*x curve since linear(x) doesn't sound good
    // console.log(this.gainNode.gain);
    this.gainNode.gain.value = fraction*fraction;
  }
}
let context = new (window.AudioContext || window.webkitAudioContext)();

let waveform = 'sine';
let note = new Sound(context, waveform);
// console.log(note);
// let toneSelector = document.getElementById('noteId');
let composedNotes = []; //c4,d4
let composedHertz = []; //220.6
let composedIndex = 0;
let maxComposedIndex = 0;
let composedNotesArea = document.getElementById('composedNotesArea');
let composedButton = document.getElementsByClassName('note');
let composeSection = document.getElementsByClassName('compose-section');
let mainWrapper = document.getElementById('mainWrapper');
let noteButtonsid = document.getElementById('noteButtons');

let notes = {
  C4: 'C',
  D4: 'D',
  E4: 'E',
  F4: 'F',
  G4: 'G',
  A4: 'A',
  B4: 'B',
  C5: 'C',
  blank: '-'
};
let sounds = {
  sine: 'peace',
  square: 'retro',
  triangle: 'smooth',
  sawtooth: 'Stranger Things'
}
// note.init();
class Note {
  constructor() {
    this.noteButtons = document.createElement('div');
    this.noteButtons.style.padding = '10px';
    this.noteButtons.className = 'note';
    this.noteButtons.style.margin = '5px';
    this.isClicked = false;
  }
}

class ColumnNote {
  constructor() {
    // console.log("ehaa aayo");
    this.column = document.createElement('div');
    this.column.setAttribute('class','column');
    composeSection[0].appendChild(this.column);
    this.toneSelector = document.createElement('select');

    for (const prop in sounds) {
      this.option = document.createElement('option');
      this.option.innerHTML = sounds[prop];
      this.option.value = prop;
      this.toneSelector.appendChild(this.option);
    }
    this.toneSelector.addEventListener('change',function() {
      // console.log(this.value);
      waveform=this.value; //changin instrument
    });

    this.column.appendChild(this.toneSelector);

    for (const prop in notes) {
      let note = new Note();
      note.noteButtons.innerHTML = notes[prop];
      note.noteButtons.value = prop;
      this.column.appendChild(note.noteButtons);
      note.noteButtons.addEventListener('click', function() {
        note.isClicked = !note.isClicked;

        if (note.isClicked) {
          let note = this.value;
          let hertzIndex = notesCollection[note];
          // console.log(hertzIndex);
          composedNotes.push(note);
          composedHertz.push(notesCollection[note]);
          maxComposedIndex++;
          composedNotesArea.value = composedNotes;
        } 
        else {
          composedNotes.splice(composedNotes.indexOf(this.value), 1);
          composedHertz.splice(composedHertz.indexOf(notesCollection[this.value]), 1);
          // console.log(this.value);
          maxComposedIndex--;
          // console.log(composedHertz);
          // console.log(composedNotes);
          composedNotesArea.value = composedNotes;
        }
      });
    }
    for (let i = 0; i < composedButton.length; i++) {
      composedButton[i].addEventListener('click', function(){ //cant use es6 function
        // console.log(composedButton.contains);
        if (this.classList.contains('note')) {
          // this.classList.remove('selected');
          this.classList.toggle('selected');
        }
      });
    }
  }
}
class NewColumn{
  constructor(){
    this.addColumn = document.createElement('div');
    // this.addColumn.className="column";
    this.addColumn.setAttribute("class","column newColumnAdder");
    this.addColumn.innerHTML = "<i class='fa fa-plus fa-3x' aria-hidden='true'></i>";
    this.addColumn.style.cursor="pointer";
    this.addColumn.style.lineHeight="532px";
    this.addColumn.style.textAlign="center";
    this.addColumn.style.border="1px solid grey";
    this.addColumn.style.borderRadius="10px";

    this.addColumn.style.height="532px";
    this.addColumn.style.marginRight="15px";
    this.addColumn.style.boxShadow="10px 10px 5px #888888";
    // this.addColumn.style.backgroundColor="khaki";
    composeSection[0].appendChild(this.addColumn);
  }
}
// console.log(addColumn);
// console.log('1',columnNote);
// let columnNote2 = new ColumnNote;
let newColumn = new NewColumn();
let columnNote = new ColumnNote();
newColumn.addColumn.addEventListener('click',()=>{ 
  new ColumnNote();
}); 
  

//to print value of TIme
function printValue(sliderID, spanID) {
  // console.log(spanID);
  let slider = document.getElementById(sliderID);
  // console.log(slider.value);
  let output = document.getElementById(spanID);
  output.innerHTML = slider.value;
  return output.value;

}

let currentNote = document.createElement('div');
currentNote.style.float="right";
currentNote.style.width="100px";
currentNote.style.height="50px";
currentNote.style.border="1px solid #888";
currentNote.style.lineHeight="50px";
currentNote.style.textAlign="center";
currentNote.style.fontSize="24px";
currentNote.style.marginRight="20px";
currentNote.style.boxShadow="2px 2px 2px 2px #888888";

function playScale() {
  let now = context.currentTime;
  // console.log(composedHertz[composedIndex]);
  note.play(composedHertz[composedIndex], now, 0);
  // console.log(composedHertz[composedIndex]);
  composedIndex++;
  currentNote.innerHTML = composedNotes[composedIndex-1];
  mainWrapper.appendChild(currentNote);
  // console.log(composedIndex);
  if (composedIndex >= maxComposedIndex) {
    composedIndex = 0;
  }
}


function stopScale() {
  note.stop(0);
}

function checkNotesChosen() {
  if (maxComposedIndex > 0) {
    return playScale();
  }
}
tempoSlider = document.getElementById('tempo');
tempoSlider.min = 10;
tempoSlider.max = 200;
tempoSlider.value = 60;
tempoSlider.step = 5;

let tempoInterval = setInterval(checkNotesChosen,60/tempoSlider.value*1000); //60->seconds
tempoSlider.addEventListener('change', ()=> {
  // console.log('slider',sendTempoValue);
  let sendTempoValue = tempoSlider.value;
  // composeSpeed(sendTempoValue);
  window.tempo = sendTempoValue
  // clearInterval(abc);

  let tempoInterval = setInterval(checkNotesChosen,60/window.tempo*1000);
});
// function changeTempoValue() {
//   let sendTempoValue = tempoSlider.value;
//   composeSpeed(sendTempoValue);
// }
// document.onload=changeTempoValue();
let volumeSlider = document.getElementById('volumeControl')
volumeSlider.addEventListener("input", function(){
  // console.log(note.controlVolume(volumeSlider));
  note.controlVolume(volumeSlider);
})
// console.log("a");
//   Sound.prototype.changeVolume = function(element){
//     var volume = element.value;
//     var fraction = parseInt(element.value) / parseInt(element.max); //using x*x curve since linear(x) doesn't sound good
//     this.gainNode.gain.value = fraction*fraction;
//   };
// })