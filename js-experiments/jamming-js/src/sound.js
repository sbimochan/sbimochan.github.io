export class Sound {
  constructor(context) {
    this.context = context; //feed AudioContext. webkit AudioContext for Safari
  }
  init() {
    this.oscillator = this
      .context
      .createOscillator(); //for electronic math sound
    this.gainNode = this
      .context
      .createGain(); //for gain
    this.analyser = this
      .context
      .createAnalyser();
    this.distortion = this
      .context
      .createWaveShaper();
    //connection to middle filters
    this
      .oscillator
      .connect(this.analyser);
    this
      .analyser
      .connect(this.distortion);
    this
      .distortion
      .connect(this.gainNode);
    this
      .gainNode
      .connect(this.context.destination);
  }
  play(hertz, time, cents) {
    this.init();
    this.oscillator.frequency.value = hertz;
    this.oscillator.detune.value = cents;
    this
      .gainNode
      .gain
      .setValueAtTime(1, this.context.currentTime); //currentTime is 2x accurate than Date
    this
      .oscillator
      .start(time);
    this.stop(time);
  }
  stop(time) {
    this
      .gainNode
      .gain
      .exponentialRampToValueAtTime(0.1, time + 1);
    this
      .oscillator
      .stop(time + 1);
  }
}