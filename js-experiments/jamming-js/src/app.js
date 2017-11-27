import { Sound } from './sound';
import { Note } from './note';
import {ColumnNote }from './columnnote';
import {MainSound}from './mainsound';
import {NewColumn}from './newcolumn';
import{Exporter}from './exporter';

let context = new(window.AudioContext || window.webkitAudioContext)();
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
  C5: 'C'
};
let sounds = {
  sine: 'peace',
  triangle: 'smooth',
  square: 'retro',
  sawtooth: 'Stranger Things'
}

let mainSound = new MainSound;
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
  columnNote.trash.addEventListener('click',()=>{
    // console.log(columnNotesArray.indexOf(columnNote));
    columnNotesArray.splice(columnNotesArray.indexOf(columnNote),1);
    columnNote.column.style.display="none";
  });
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
tempoSlider.max = 400;
tempoSlider.value = 60;
tempoSlider.step = 5;

detuneSlider = document.getElementById('detune');
detuneSlider.min = -900;
detuneSlider.max = 900;
detuneSlider.value = 0;
detuneSlider.step = 50;
let i = 0;
function playComposition(){
  if (columnNotesArray.length != 0) {
    let now = context.currentTime;
    if (i != 0) {
      columnNotesArray[i - 1].column.style.backgroundColor = '#ecf0f1';
    }
    else {
      columnNotesArray[columnNotesArray.length - 1].column.style.backgroundColor = '#ecf0f1';
    }
    columnNotesArray[i].column.style.backgroundColor = '#e5f6ff';
    for (let j = 0; j < columnNotesArray[i].composedHertzArray.length; j++) { //3,4
      sound.play(columnNotesArray[i].composedHertzArray[j], now, detuneSlider.value); //third param = detune in cents
      sound.oscillator.type=columnNotesArray[i].waveform;
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
/*To load JSON file*/
let importer = document.getElementById('import').addEventListener('click',()=>{
let file = document.getElementById('input_file').files;
  if(file.length !=1){
    return false;
  }
  let fr = new FileReader;
  fr.onload = (progressEvent)=>{
    let results = JSON.parse(progressEvent.target.result);
    results.forEach((result)=>{
      let column = new ColumnNote(result.composedHertzArray, result.waveform)
      columnNotesArray.push(column);
    });
  }
fr.readAsText(file.item(0));
});
