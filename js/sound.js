// all sound and music must be deferred
// until after 1st user interaction (see input.js)
// because browsers don't permit sound to "autoplay" anymore

var soundInitialized = false;
var music = null;
const MUSIC_SOUND_VOLUME = 0.125; // very quiet so GUI/battle sfx dominate

// example use:
// if (music) music.play();

function soundInitialize() { // called by first user input

    if (soundInitialized) return; // only run once
    
    console.log("PLAYING MUSIC");
    
    // music by Michael Avrie - @tarnishedmoth
    music = new Audio("../audio/music_10_minute_ambience.mp3");
    music.volume = MUSIC_SOUND_VOLUME;
    music.loop = true; // continue forever
    music.play();
    
    soundInitialized = true;
}
