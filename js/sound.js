// all sound and music must be deferred
// until after 1st user interaction (see input.js)
// because browsers don't permit sound to "autoplay" anymore

var soundInitialized = false;

var music, pauseSound, endTurnSound, confirmSound; // add more here

const MUSIC_SOUND_VOLUME = 0.125; // very quiet
const SFX_VOLUME = 1; // max volume, as recorded

// example code safe to use anytime:
// if (music) music.play();

function soundInitialize() { // called by first user input

    if (soundInitialized) return; // only run once
    
    console.log("PLAYING MUSIC");
    
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
    
    soundInitialized = true;
}
