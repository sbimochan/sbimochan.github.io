class Sound {
  constructor(context) {
    this.context = context; //feed AudioContext. webkit AudioContext for Safari
    // this.waveform = 'sine';
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
    // this.oscillator.type; //could be waveforms like sine,square,triangle,sawtooth
  }
  play(hertz, time, cents) {
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
// waveform = 'sawtooth';
let sound = new Sound(context);
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
};
let sounds = {
  sine: 'peace',
  triangle: 'smooth',
  square: 'retro',
  sawtooth: 'Stranger Things'
}
class Note {
  constructor() {
    this.noteButtons = document.createElement('div');
    this.noteButtons.style.padding = '10px';
    this.noteButtons.className = 'note';
    this.noteButtons.style.margin = '5px';
    this.isClicked = false;
  }
}
class MainSound{
  constructor(){
    this.waveform = 'sine';
    this.mainSoundDiv=document.createElement('div');
    this.mainSoundDiv.className='mainSoundDiv';
    this.mainSoundDiv.innerHTML="Main sound: ";
    mainWrapper.insertAdjacentElement('afterbegin',this.mainSoundDiv);
    this.toneSelector = document.createElement('select');
    for (const prop in sounds) {
      this.option = document.createElement('option');
      this.option.innerHTML = sounds[prop];
      this.option.value = prop;
      this.toneSelector.appendChild(this.option);
    }
    this.mainSoundDiv.appendChild(this.toneSelector);
    this.toneSelector.addEventListener('change', () => {
      columnNotesArray.forEach((column)=>{
        column.waveform=this.toneSelector.value;
        column.toneSelector.value=this.toneSelector.value
      });
      // this.waveform = this.toneSelector.value; //changing instrument
    });
  }
}
let mainSound = new MainSound;
class ColumnNote {
  constructor() {
    this.composedHertzArray = [];
    this.composedNotesArray = [];
    this.waveform='sine';
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
    this.column.appendChild(this.toneSelector);
    this.toneSelector.addEventListener('change',()=> {
      this.waveform = this.toneSelector.value; //changing instrument
    });
    for (const prop in notes) {
      let note = new Note();
      note.noteButtons.innerHTML = notes[prop];
      note.noteButtons.value = prop;
      this.column.appendChild(note.noteButtons);
      note.noteButtons.addEventListener('click', () => {
        note.isClicked = !note.isClicked;
        if (note.isClicked) {
          let noteValue = note.noteButtons.value;
          let hertzIndex = notesCollection[noteValue];
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
    this.addColumn.setAttribute("class", "column newColumnAdder");
    this.addColumn.innerHTML = "<i class='fa fa-plus fa-3x' aria-hidden='true'></i>";
    this.addColumn.style.cursor = "pointer";
    this.addColumn.style.lineHeight = "532px";
    this.addColumn.style.textAlign = "center";
    this.addColumn.style.border = "1px solid grey";
    this.addColumn.style.borderRadius = "10px";
    this.addColumn.style.height = "460px";
    this.addColumn.style.marginRight = "15px";
    this.addColumn.style.boxShadow = "10px 10px 5px #888888";
    composeSection[0].appendChild(this.addColumn);
  }
}
class Exporter{
  constructor(){
    this.exporterDiv = document.createElement('div');
    mainWrapper.appendChild(this.exporterDiv);
    this.button = document.createElement('a');
    this.button.innerHTML="Save your song";
    this.exporterDiv.id="exporter";
    this.exporterDiv.appendChild(this.button);
  }
}
let columnNotesArray = [];
let newColumn = new NewColumn(); //Adder
let exporter = new Exporter;
exporter.button.addEventListener('click',()=>{
  //to write into json
  let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(columnNotesArray));
  exporter.button.href="data:"+data;
  exporter.button.download="song.json";
});

newColumn.addColumn.addEventListener('click', () => {
  let columnNote = new ColumnNote();
  columnNotesArray.push(columnNote);
});
//to print value of Tempo
function printValue(sliderID, spanID) {
  let slider = document.getElementById(sliderID);
  let output = document.getElementById(spanID);
  output.innerHTML = slider.value + " bpm";
  return output.value;
}

let tempoInterval;
tempoSlider = document.getElementById('tempo');
tempoSlider.min = 10;
tempoSlider.max = 200;
tempoSlider.value = 60;
tempoSlider.step = 5;
let i = 0;

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
      sound.oscillator.type=columnNotesArray[i].waveform;
      // sound.oscillator.type=mainSound.waveform;
      // console.log(sound.oscillator.type);
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