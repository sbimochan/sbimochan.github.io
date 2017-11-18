var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

//set up the different audio nodes we will use for the app
var analyser = audioCtx.createAnalyser();
var distortion = audioCtx.createWaveShaper();
var gainNode = audioCtx.createGain();
var biquadFilter = audioCtx.createBiquadFilter();
var convolver = audioCtx.createConvolver();

// connect the nodes together
var oscillator = audioCtx.createOscillator();

// source = audioCtx.createMediaStreamSource(oscillator);
oscillator.connect(analyser);
analyser.connect(distortion);
distortion.connect(biquadFilter);
biquadFilter.connect(convolver);
convolver.connect(gainNode);
gainNode.connect(audioCtx.destination);

// Manipulate the Biquad filter

biquadFilter.type = "lowshelf";
biquadFilter.frequency.value = 1000;
biquadFilter.gain.value = 25;

biquadFilter.type = "peaking";
biquadFilter.frequency.value = 1000;
biquadFilter.Q.value = 100;
biquadFilter.gain.value = 25;
