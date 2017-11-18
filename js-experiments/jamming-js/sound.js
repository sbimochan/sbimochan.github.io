class Sound {
  constructor(context,waveform) {
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
    this.gainNode.gain.exponentialRampToValueAtTime(0.01, time + 1);
    this.oscillator.stop(time + 1);
  }
}
let context = new (window.AudioContext || window.webkitAudioContext)();
function changeSoundType() {
  let soundType = document.getElementById('soundType');
  let soundTypeValue = soundType.options[soundType.selectedIndex].value;
  
}
let waveform = "triangle";
let note = new Sound(context, waveform);
let toneSelector = document.getElementById("noteId");
let composedNotes = []; //c4,d4
let composedHertz = []; //220.6
let composedIndex = 0;
let maxComposedIndex = 0;
let composedNotesArea = document.getElementById("composedNotesArea");
let composedButton = document.getElementsByClassName("note");
let column = document.getElementsByClassName("column");
let mainWrapper = document.getElementById("mainWrapper");
let noteButtonsid = document.getElementById("noteButtons");

let notes = {
  C4: "C",
  D4: "D",
  E4: "E",
  F4: "F",
  G4: "G",
  A4: "A",
  B4: "B",
  C5: "C",
  blank: "-"
};
// note.init();
class Note {
  constructor() {
    this.noteButtons = document.createElement("button");
    this.noteButtons.style.padding = "20px";
    this.noteButtons.className = "note";
    this.noteButtons.style.margin = "5px";
    
  }
}

class ColumnNote{
  constructor(){

    for (const prop in notes) {
      let note = new Note();
      note.noteButtons.innerHTML = notes[prop];
      note.noteButtons.value = prop;
      column[0].appendChild(note.noteButtons);
      note.noteButtons.addEventListener("click", function () {
        let note = this.value;
        composedNotes.push(note);
        composedHertz.push(notesCollection[note]);
        maxComposedIndex++;
        composedNotesArea.value = composedNotes;
      });
    }
  }
}
let columnNote = new ColumnNote;

// for (const prop in notes) {
//   let note = new Note();
//   note.noteButtons.innerHTML = notes[prop];
//   note.noteButtons.value = prop;
//   column[0].appendChild(note.noteButtons);
//   note.noteButtons.addEventListener("click", function () {
//     let note = this.value;
//     composedNotes.push(note);
//     composedHertz.push(notesCollection[note]);
//     maxComposedIndex++;
//     composedNotesArea.value = composedNotes;
//   });
// }

for (let i = 0; i < composedButton.length; i++) {
  composedButton[i].addEventListener("click", function () {
    if (this.classList.contains("note")) {
      // this.classList.remove('selected');
      this.classList.add("selected");
    } else if (this.classList.contains("selected")) {
      this.classList.remove("selected");
    }
  });
}

function printValue(sliderID, spanID) {
  // console.log(spanID);
  let slider = document.getElementById(sliderID);
  console.log(slider.value);
  let output = document.getElementById(spanID);
  output.innerHTML = slider.value;
  return output.value;
  // output.innerHTML=slider.value;
}

function playScale() {
  let now = context.currentTime;
  note.play(composedHertz[composedIndex], now, 0);
  composedIndex++;
  if (composedIndex >= maxComposedIndex) {
    composedIndex = 0;
  }
}
function stopScale() {
  note.stop(0);
}

setInterval(checkNotesChosen, 1000);

function checkNotesChosen() {
  if (maxComposedIndex > 0) {
    return playScale();
  }
}
