/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sound__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__note__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__columnnote__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mainsound__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__newcolumn__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__exporter__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils__ = __webpack_require__(7);








let mainSound = new __WEBPACK_IMPORTED_MODULE_3__mainsound__["a" /* MainSound */];
let columnNotesArray = [];
let newColumn = new __WEBPACK_IMPORTED_MODULE_4__newcolumn__["a" /* NewColumn */](); //Adder
let exporter = new __WEBPACK_IMPORTED_MODULE_5__exporter__["a" /* Exporter */];
exporter.button.addEventListener('click', () => {
  //to write into json
  let data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(columnNotesArray));
  exporter.button.href = "data:" + data;
  exporter.button.download = "song.json";
});

newColumn.addColumn.addEventListener('click', () => {
  let columnNote = new __WEBPACK_IMPORTED_MODULE_2__columnnote__["a" /* ColumnNote */]();
  columnNotesArray.push(columnNote);
  columnNote.trash.addEventListener('click', () => {
    // console.log(columnNotesArray.indexOf(columnNote));
    columnNotesArray.splice(columnNotesArray.indexOf(columnNote), 1);
    columnNote.column.style.display = "none";
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
function playComposition() {
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
      console.log(detuneSlider.value);
      sound.play(columnNotesArray[i].composedHertzArray[j], now, detuneSlider.value); //third param = detune in cents
      sound.oscillator.type = columnNotesArray[i].waveform;
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

/*To load JSON file*/
let importer = document.getElementById('import').addEventListener('click', () => {
  let file = document.getElementById('input_file').files;
  console.log(file);
  if (file.length != 1) {
    return false;
  }
  let fr = new FileReader;
  fr.onload = (progressEvent) => {
    console.log(progressEvent);
    let result = JSON.parse(progressEvent.target.result);

    let hertz = result.map(function (a) {
      return a.composedNotesArray + 'has frequency of' + a.composedHertzArray;
    });
    console.log(hertz);
    // let loadSong = new ColumnNote;
    // loadSong.composedHertzArray = result[0].composedHertzArray;
    // loadSong.composedNotesArray = result[0].composedNotesArray;

    // columnNotesArray=result;
    // let formatted = JSON.stringify(result,null,2); //variable,replace by,spaces
    // console.log(formatted);
    // window.localStorage.setItem('jamming-js',formatted);
  }
  fr.readAsText(file.item(0));
  // let retrieveSong = window.localStorage.getItem('jamming-js');
  // console.log(retrieveSong);
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Sound {
  constructor(context) {
    this.context = context; //feed AudioContext. webkit AudioContext for Safari
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
/* unused harmony export Sound */
 

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Note {
  constructor() {
    this.noteButtons = document.createElement('div');
    this.noteButtons.style.padding = '10px';
    this.noteButtons.className = 'note';
    this.noteButtons.style.margin = '5px';
    this.isClicked = false;
  }
}
/* unused harmony export Note */


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class ColumnNote {
  constructor() {
    this.composedHertzArray = [];
    this.composedNotesArray = [];
    this.waveform = 'sine';
    this.column = document.createElement('div');
    this.column.setAttribute('class', 'column');
    composeSection[0].appendChild(this.column);
    this.toneSelector = document.createElement('select');
    this.toneSelector.style.width = "100px";
    for (const prop in sounds) {
      this.option = document.createElement('option');
      this.option.innerHTML = sounds[prop];
      this.option.value = prop;
      this.toneSelector.appendChild(this.option);
    }
    this.column.appendChild(this.toneSelector);
    this.toneSelector.addEventListener('change', () => {
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
      note.noteButtons.addEventListener('click', () => {
        // console.log(note.noteButtons);
        if (note.noteButtons.classList.contains('note')) {
          note.noteButtons.classList.toggle('selected');
        }
      });
    }
    this.trash = document.createElement('button');
    this.trash.setAttribute('class', 'danger');
    this.trashIconHolder = document.createElement('span');
    this.trashIconHolder.innerHTML = "<i class='fa fa-trash-o' aria-hidden='true'></i>";
    this.trash.appendChild(this.trashIconHolder);
    this.column.appendChild(this.trash);

  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ColumnNote;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MainSound {
  constructor() {
    this.waveform = 'sine';
    this.mainSoundDiv = document.createElement('div');
    this.mainSoundDiv.className = 'mainSoundDiv';
    this.mainSoundDiv.innerHTML = "Main sound: ";
    mainWrapper.insertAdjacentElement('afterbegin', this.mainSoundDiv);
    this.toneSelector = document.createElement('select');
    for (const prop in sounds) {
      this.option = document.createElement('option');
      this.option.innerHTML = sounds[prop];
      this.option.value = prop;
      this.toneSelector.appendChild(this.option);
    }
    this.mainSoundDiv.appendChild(this.toneSelector);
    this.toneSelector.addEventListener('click', () => {
      columnNotesArray.forEach((column) => {
        column.waveform = this.toneSelector.value;//changing instrument
        column.toneSelector.value = this.toneSelector.value
      });
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MainSound;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class NewColumn {
  constructor() {
    this.addColumn = document.createElement('div');
    this.addColumn.setAttribute("class", "column newColumnAdder");
    this.addColumn.innerHTML = "<i class='fa fa-plus fa-3x' aria-hidden='true'></i>";
    this.addColumn.style.cursor = "pointer";
    this.addColumn.style.float = "left";
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
/* harmony export (immutable) */ __webpack_exports__["a"] = NewColumn;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Exporter {
  constructor() {
    this.exporterDiv = document.createElement('div');
    mainWrapper.appendChild(this.exporterDiv);
    this.button = document.createElement('a');
    this.button.innerHTML = "Save your song";
    this.exporterDiv.id = "exporter";
    this.exporterDiv.appendChild(this.button);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Exporter;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export context */
let context = new (window.AudioContext || window.webkitAudioContext)();
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
  C5: 'C'
};
let sounds = {
  sine: 'peace',
  triangle: 'smooth',
  square: 'retro',
  sawtooth: 'Stranger Things'
}


/***/ })
/******/ ]);