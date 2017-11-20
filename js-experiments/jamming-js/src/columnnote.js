export class ColumnNote {
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