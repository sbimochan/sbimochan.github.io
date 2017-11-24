export class ColumnNote {
  constructor() {
    this.composedHertzArray = [];
    this.composedNotesArray = [];
    this.waveform = 'sine';
    this.column = document.createElement('div');
    this
      .column
      .setAttribute('class', 'column');
    composeSection[0].appendChild(this.column);
    this.toneSelector = document.createElement('select');
    for (const prop in sounds) {
      this.option = document.createElement('option');
      this.option.innerHTML = sounds[prop];
      this.option.value = prop;
      this
        .toneSelector
        .appendChild(this.option);
    }
    this
      .column
      .appendChild(this.toneSelector);
    this
      .toneSelector
      .addEventListener('change', () => {
        this.waveform = this.toneSelector.value; //changing instrument
      });
    for (const prop in notes) {
      let note = new Note();
      note.noteButtons.innerHTML = notes[prop];
      note.noteButtons.value = prop;
      this
        .column
        .appendChild(note.noteButtons);
      note
        .noteButtons
        .addEventListener('click', () => {
          note.isClicked = !note.isClicked;
          if (note.isClicked) {
            let noteValue = note.noteButtons.value;
            let hertzIndex = notesCollection[noteValue];
            this
              .composedNotesArray
              .push(noteValue);
            this
              .composedHertzArray
              .push(notesCollection[noteValue]);
          } else {
            this
              .composedNotesArray
              .splice(this.composedNotesArray.indexOf(note.noteButtons.value), 1);
            this
              .composedHertzArray
              .splice(this.composedHertzArray.indexOf(notesCollection[note.noteButtons.value]), 1);
          }
        });
      note
        .noteButtons
        .addEventListener('click', () => {
          console.log(note.noteButtons);
          if (note.noteButtons.classList.contains('note')) {
            note
              .noteButtons
              .classList
              .toggle('selected');
          }
        });
    }

  }
}