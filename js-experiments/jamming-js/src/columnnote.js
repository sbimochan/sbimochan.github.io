export class ColumnNote {
  constructor(hertzArr,waveform) {
    this.composedHertzArray = [];
    this.waveform = 'sine';
    if (typeof (hertzArr) != 'undefined' && typeof (waveform) != 'undefined') {
      this.waveform = waveform;
      this.composedHertzArray = hertzArr.slice(0);
    }
    this.column = document.createElement('div');
    this.column.setAttribute('class', 'column');
    composeSection[0].appendChild(this.column);
    this.toneSelector = document.createElement('select');
    this.toneSelector.style.width="100px";
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
    for (const prop in notes) { //or notesCollection
      let note = new Note();
      note.noteButtons.innerHTML = notes[prop]; //name on view .or prop
      note.noteButtons.value = prop;  //value of button. or notesCollection[prop]
      this.column.appendChild(note.noteButtons);
      let noteValue = note.noteButtons.value;
      let hertzIndex = notesCollection[noteValue];
      note.noteButtons.addEventListener('click', () => {
        note.isClicked = !note.isClicked;
        if (note.isClicked) {
          this.composedHertzArray.push(hertzIndex);
        } else {
          this.composedHertzArray.splice(this.composedHertzArray.indexOf(notesCollection[note.noteButtons.value]), 1);
        }
      });
      note.noteButtons.addEventListener('click', () => {
        if (note.noteButtons.classList.contains('note')) {
          note.noteButtons.classList.toggle('selected');
        }
      });
    if(this.composedHertzArray.indexOf(hertzIndex) != -1 ){
      note.noteButtons.classList.toggle('selected');
      }
    }
    this.trash = document.createElement('button');
    this.trash.setAttribute('class','danger');
    this.trashIconHolder = document.createElement('span');
    this.trashIconHolder.innerHTML = "<i class='fa fa-trash-o' aria-hidden='true'></i>";
    this.trash.appendChild(this.trashIconHolder);
    this.column.appendChild(this.trash);
  }
}