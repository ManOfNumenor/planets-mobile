const ALL_SOUND_MUTED = false; // true for pure silence

// all sound and music must be deferred
// until after 1st user interaction (see input.js)
// because browsers don't permit sound to "autoplay" anymore

var soundInitialized = false;

var music, pauseSound, endTurnSound, confirmSound, choiceSound; // add more here

const MUSIC_SOUND_VOLUME = 0.125; // very quiet
const SFX_VOLUME = 1; // max volume, as recorded

// example code safe to use anytime:
// if (music) music.play();

function soundInitialize() { // called by first user input
    if (ALL_SOUND_MUTED) return; // never downloads anything if true
    if (soundInitialized) return; // only run this once
    
    console.log("Initializing sound and STARTING MUSIC");
    
    // music by Michael Avrie - @tarnishedmoth
    music = new Audio("../audio/music_10_minute_ambience.mp3");
    music.volume = MUSIC_SOUND_VOLUME;
    music.loop = true; // continue forever
    music.play();

    pauseSound = new Audio("../audio/pause.wav");
    pauseSound.volume = SFX_VOLUME;
    
    endTurnSound = new Audio("../audio/end-turn.wav");
    endTurnSound.volume = SFX_VOLUME;
    
    confirmSound = new Audio("../audio/deep-confirm.wav");
    confirmSound.volume = SFX_VOLUME;

    choiceSound = makeChoiceSound;
    
    soundInitialized = true;
}

function makeChoiceSound() {
    if (ALL_SOUND_MUTED) return;

    const AudioMaker = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioMaker();
    const baseTime = ctx.currentTime;

    const frequencies = [600, 800, 1000];
    const delays = [0, 0.04, 0.08];

    frequencies.forEach((freq, i) => {
         const oscillator = ctx.createOscillator();
         const gainNode = ctx.createGain();

         oscillator.type = 'square';
         oscillator.frequency.value = freq;

         const startTime = baseTime + delays[i];
         gainNode.gain.setValueAtTime(0, startTime);
         gainNode.gain.linearRampToValueAtTime(0.3 * SFX_VOLUME, startTime + 0.005);
         gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.03);

         oscillator.connect(gainNode);
         gainNode.connect(ctx.destination);

         oscillator.start(startTime);
         oscillator.stop(startTime + 0.03);
    });
}
