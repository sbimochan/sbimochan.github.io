import { Sound } from './sound';
import { Note } from './note';
import {ColumnNote }from './columnnote';


let context = new (window.AudioContext || window.webkitAudioContext)();
// function changeSoundType() {
//   let soundType = document.getElementById('soundType');
//   let soundTypeValue = soundType.options.value[soundType.selectedIndex].value;

// }
let waveform = 'triangle';
let note = new Sound(context, waveform);
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
  triangle: 'brutal',
  sawtooth: 'shark'
}
// note.init();


let columnNote = new ColumnNote;
let colunNote2 = new ColumnNote;
// for (const prop in notes) {
//   let note = new Note();
//   note.noteButtons.innerHTML = notes[prop];
//   note.noteButtons.value = prop;
//   column[0].appendChild(note.noteButtons);
//   note.noteButtons.addEventListener('click', function () {
//     let note = this.value;
//     composedNotes.push(note);
//     composedHertz.push(notesCollection[note]);
//     maxComposedIndex++;
//     composedNotesArea.value = composedNotes;
//   });
// }

for (let i = 0; i < composedButton.length; i++) {
  composedButton[i].addEventListener('click', function () { //cant use es6 function
    if (this.classList.contains('note')) {
      // this.classList.remove('selected');
      this.classList.toggle('selected');
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

let composeSpeed = (tempo) => {
  console.log('tempo', tempo / 60 * 1000);
  setInterval(checkNotesChosen, tempo / 60 * 1000);

  // console.log(setInterval(checkNotesChosen, tempo));
};

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

tempoSlider.addEventListener('change', () => {
  // console.log('slider',sendTempoValue);
  sendTempoValue = tempoSlider.value;
  composeSpeed(sendTempoValue);
});
function changeTempoValue() {
  let sendTempoValue = tempoSlider.value;
  composeSpeed(sendTempoValue);
}
// document.onload=changeTempoValue();