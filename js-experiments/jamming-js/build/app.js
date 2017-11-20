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





let context = new (window.AudioContext || window.webkitAudioContext)();
// function changeSoundType() {
//   let soundType = document.getElementById('soundType');
//   let soundTypeValue = soundType.options.value[soundType.selectedIndex].value;

// }
let waveform = 'triangle';
let note = new __WEBPACK_IMPORTED_MODULE_0__sound__["a" /* Sound */](context, waveform);
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


let columnNote = new __WEBPACK_IMPORTED_MODULE_2__columnnote__["a" /* ColumnNote */];
let colunNote2 = new __WEBPACK_IMPORTED_MODULE_2__columnnote__["a" /* ColumnNote */];
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

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
    this.gainNode.gain.exponentialRampToValueAtTime(0.01, time + 1);
    this.oscillator.stop(time + 1);
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sound;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Note {
  constructor() {
    this.noteButtons = document.createElement('div');
    this.noteButtons.style.padding = '20px';
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
    this.column = document.createElement('div');
    this.column.className = 'column';
    composeSection[0].appendChild(this.column);
    this.toneSelector = document.createElement('select');

    for (const prop in sounds) {
      this.option = document.createElement('option');
      this.option.innerHTML = sounds[prop];
      this.option.value = prop;
      this.toneSelector.appendChild(this.option);
    }

    this.toneSelector.addEventListener('change', () => {
      console.log(this.value);
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
          composedIndex--;
          console.log(composedHertz);
          console.log(composedNotes);
          composedNotesArea.value = composedNotes;
        }
      });
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ColumnNote;


/***/ })
/******/ ]);