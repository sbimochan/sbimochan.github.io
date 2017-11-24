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
      this
        .toneSelector
        .appendChild(this.option);
    }
    this
      .mainSoundDiv
      .appendChild(this.toneSelector);
    this
      .toneSelector
      .addEventListener('change', () => {
        columnNotesArray.forEach((column) => {
          column.waveform = this.toneSelector.value; //changing instrument
          column.toneSelector.value = this.toneSelector.value
        });
      });
  }
}