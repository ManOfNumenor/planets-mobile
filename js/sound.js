const ALL_SOUND_MUTED = false; // true for pure silence

// all sound and music must be deferred
// until after 1st user interaction (see input.js)
// because browsers don't permit sound to "autoplay" anymore

var soundInitialized = false;

var music, pauseSound, endTurnSound, 
    confirmSound, choiceSound, explosionSound, 
    muffledExplosionSound, fleetSplitSound, 
    fleetArriveSound, captureSound; // add more here

// Add more music tracks here, one is chosen randomly
const musicTracks = [
    "../audio/music_10_minute_ambience.mp3",
    "../audio/music-track-2.mp3"
];

const MUSIC_SOUND_VOLUME = 0.125; // very quiet
const SFX_VOLUME = 1; // max volume, as recorded

// example code safe to use anytime:
// if (music) music.play();

function soundInitialize() { // called by first user input
    if (ALL_SOUND_MUTED) return; // never downloads anything if true
    if (soundInitialized) return; // only run this once
    
    console.log("Initializing sound and STARTING MUSIC");
    
    // music by Michael Avrie - @tarnishedmoth
    //music = new Audio("../audio/music_10_minute_ambience.mp3");
    // Choose random music track
    music = new Audio(musicTracks[Math.floor(Math.random() * musicTracks.length)]);
    music.volume = getMusicSoundVolume();
    music.loop = true; // continue forever
    music.play();

    pauseSound = new Audio("../audio/pause.wav");
    pauseSound.volume = getSFXVolume();
    
    endTurnSound = new Audio("../audio/end-turn.wav");
    endTurnSound.volume = getSFXVolume();
    
    confirmSound = new Audio("../audio/deep-confirm.wav");
    confirmSound.volume = getSFXVolume();

    explosionSound = new Audio("../audio/explosion.wav"); // Swapped to WAV for compatability
    explosionSound.volume = getSFXVolume();

    muffledExplosionSound = new Audio("../audio/muffled_explosion.wav");
    muffledExplosionSound.volume = getSFXVolume();

    // alternate sounding version: teleportation.wav
    fleetSplitSound = new Audio("../audio/warp-drive.wav");
    fleetSplitSound.volume = getSFXVolume();

    fleetArriveSound = new Audio("../audio/warp-drive-reverse.wav");
    fleetArriveSound.volume = getSFXVolume();

    captureSound = new Audio("../audio/capture-planet.wav");
    captureSound.volume = getSFXVolume();

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
         gainNode.gain.linearRampToValueAtTime(0.3 * getSFXVolume(), startTime + 0.005);
         gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.03);

         oscillator.connect(gainNode);
         gainNode.connect(ctx.destination);

         oscillator.start(startTime);
         oscillator.stop(startTime + 0.03);
    });
}

function getSFXVolume()
{
    return gameOptions.soundEffectsEnabled ? SFX_VOLUME : 0;
}

function getMusicSoundVolume()
{
    return gameOptions.musicEnabled ? MUSIC_SOUND_VOLUME: 0;
}

// mutes and unmutes sound volumes
function toggleSoundEffects() {
    gameOptions.soundEffectsEnabled = !gameOptions.soundEffectsEnabled;
    document.getElementById('soundEffectsButton').innerText = 
        "Sound Effects: " + ( gameOptions.soundEffectsEnabled ? 'On' : 'Off' );

    let vol = gameOptions.soundEffectsEnabled ? SFX_VOLUME : 0;
    if (pauseSound) pauseSound.volume = vol;
    if (endTurnSound) endTurnSound.volume = vol;
    if (confirmSound) confirmSound.volume = vol;
    if (choiceSound) choiceSound.volume = vol;
    if (explosionSound) explosionSound.volume = vol;
    if (muffledExplosionSound) muffledExplosionSound.volume = vol;
    if (fleetSplitSound) fleetSplitSound.volume = vol;
    if (fleetArriveSound) fleetArriveSound.volume = vol;
    if (captureSound) captureSound.volume = vol;
    console.log("sound effects volume is now "+vol);
}

function toggleMusic() {
    gameOptions.musicEnabled = !gameOptions.musicEnabled;
    document.getElementById('musicButton').innerText = 
        "Music: " + ( gameOptions.musicEnabled ? 'On' : 'Off' );
    let vol = gameOptions.musicEnabled ? MUSIC_SOUND_VOLUME : 0;
    if (music) music.volume = vol;
    console.log("music volume is now "+vol);
}

