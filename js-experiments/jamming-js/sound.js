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
}
//Sound Class End*
let context = new(window.AudioContext || window.webkitAudioContext)();
waveform = 'sawtooth';
let sound = new Sound(context, waveform);
// let composedNotes = []; //c4,d4 let composedHertz = []; //220.6 let
// composedIndex = 0; let maxComposedIndex = 0;
// let composedNotesArea = document.getElementById('composedNotesArea');
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
  sawtooth: 'Stranger Things',
  sine: 'peace',
  square: 'retro',
  triangle: 'smooth'
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
    this.composedHertzArray = [];
    this.composedNotesArray = [];
    this.composedIndex = 0;
    this.maxComposedIndex = 0;
    this.column = document.createElement('div');
    this.column.setAttribute('class', 'column');
    composeSection[0].appendChild(this.column);
    this.toneSelector = document.createElement('select');
    for (const prop in sounds) {
      this.option = document.createElement('option');
      this.option.innerHTML = sounds[prop];
      this.option.value = prop;
      this.toneSelector.appendChild(this.option);
    }
    this.toneSelector.addEventListener('change', function() {
      // console.log(this.value);
      waveform = this.value; //changin instrument
    });
    this.column.appendChild(this.toneSelector);
    for (const prop in notes) {
      let note = new Note();
      note.noteButtons.innerHTML = notes[prop];
      note.noteButtons.value = prop;
      this.column.appendChild(note.noteButtons);
      note.noteButtons.addEventListener('click', () => {
        note.isClicked = !note.isClicked;
        if (note.isClicked) {
          let noteValue = note.noteButtons.value;
          // console.log(note.noteButtons.value);
          let hertzIndex = notesCollection[noteValue];
          // console.log();
          this.composedNotesArray.push(noteValue);
          this.composedHertzArray.push(notesCollection[noteValue]);
        } else {
          this.composedNotesArray.splice(this.composedNotesArray.indexOf(note.noteButtons.value), 1);
          this.composedHertzArray.splice(this.composedHertzArray.indexOf(notesCollection[note.noteButtons.value]), 1);
        }
      });
    }
    for (let i = 0; i < composedButton.length; i++) {
      composedButton[i].addEventListener('click', function() { //cant use es6 function
        // console.log(composedButton.contains);
        if (this.classList.contains('note')) {
          // this.classList.remove('selected');
          this.classList.toggle('selected');
        }
      });
    }
  }
}
class NewColumn {
  constructor() {
    this.addColumn = document.createElement('div');
    // this.addColumn.className="column";
    this.addColumn.setAttribute("class", "column newColumnAdder");
    this.addColumn.innerHTML = "<i class='fa fa-plus fa-3x' aria-hidden='true'></i>";
    this.addColumn.style.cursor = "pointer";
    this.addColumn.style.lineHeight = "532px";
    this.addColumn.style.textAlign = "center";
    this.addColumn.style.border = "1px solid grey";
    this.addColumn.style.borderRadius = "10px";
    this.addColumn.style.height = "532px";
    this.addColumn.style.marginRight = "15px";
    this.addColumn.style.boxShadow = "10px 10px 5px #888888";
    // this.addColumn.style.backgroundColor="khaki";
    composeSection[0].appendChild(this.addColumn);
  }
}
let tempoInterval;
// console.log(addColumn); console.log('1',columnNote); let columnNote2 = new
// ColumnNote;
let columnNotesArray = [];
let newColumn = new NewColumn();
newColumn.addColumn.addEventListener('click', () => {
  let columnNote = new ColumnNote();
  // new ColumnNote();
  columnNotesArray.push(columnNote);
  // clearInterval(tempoInterval); playAbc();
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
tempoSlider = document.getElementById('tempo');
tempoSlider.min = 10;
tempoSlider.max = 200;
tempoSlider.value = 60;
tempoSlider.step = 5;
let i = 0;
// function playAbc() {
function playComposition(){
  if (columnNotesArray.length != 0) {
    let now = context.currentTime;
    if (i != 0) {
      columnNotesArray[i - 1].column.style.backgroundColor = 'white';
    }
    else {
      columnNotesArray[columnNotesArray.length - 1].column.style.backgroundColor = 'white';
    }
    columnNotesArray[i].column.style.backgroundColor = '#e5f6ff';
    for (let j = 0; j < columnNotesArray[i].composedHertzArray.length; j++) { //3,4
      sound.play(columnNotesArray[i].composedHertzArray[j], now, 0); //third param = detune in cents
      // console.log('j', columnNotesArray[i]);
    }
    i++;
    if (i >= columnNotesArray.length) {
      i = 0;
    }
  }
}
tempoInterval = setInterval(playComposition, 1000); 
tempoSlider.addEventListener('change', () => {
  let sendTempoValue = tempoSlider.value;
  clearInterval(tempoInterval);
  tempoInterval = setInterval(playComposition, 60 / sendTempoValue * 1000);
});