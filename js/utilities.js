var gameOptions = {
    showOrbitDebugInfo: false,
    showPointerDebugInfo: false,
    starfieldStarsPerLayer: 100,
    starfieldLayerCount: 3,
    starfieldWidth: 3000,
    starfieldHeight: 3000,
    radialPlanetShadows: false,
    soundEffectsEnabled: true,
    musicEnabled: true,
};

// note: this function is never used
function resetGameOptions() {
    gameOptions.showOrbitDebugInfo = true;
    gameOptions.showPointerDebugInfo = false;
    gameOptions.starfieldStarsPerLayer = 10000;
    gameOptions.starfieldLayerCount = 3;
    gameOptions.starfieldWidth = 3000;
    gameOptions.starfieldHeight = 3000;
    gameOptions.radialPlanetShadows =  false;
    gameOptions.soundEffectsEnabled = true;
    gameOptions.musicEnabled = true;
}

function alertDialog(message, okFunction) {
    let dialog = document.getElementById('alertDialog');

    dialog.firstElementChild.innerHTML = message;

    if (okFunction){
        dialog.lastElementChild.onclick = () => {
            okFunction();
            closeAlertDialog();
        };
    } 
    else {
        dialog.lastElementChild.onclick = () => {
            closeAlertDialog();
        };
    }

    dialog.showModal();
}

function closeAlertDialog() {
    let dialog = document.getElementById('alertDialog');
     dialog.lastElementChild.onclick = () => {
        closeAlertDialog();
    };
    dialog.close();
}

function testConfirmDialog(testArg) {
    console.log('testConfirmDialog', testArg);
     confirmDialog('Testing confirmation dialog', 
         () => console.log(testArg));

    //console.log('confirmed?', confirmed);
}

function confirmDialog(message, confirmFunction) {
    let dialog = document.getElementById('confirmDialog');

    dialog.firstElementChild.innerText = message;

    dialog.lastElementChild.onclick = () => {
        confirmFunction();
        closeConfirmDialog();
    };

    dialog.showModal();
}

function closeConfirmDialog() {
    let dialog = document.getElementById('confirmDialog');
    dialog.close();

    dialog.lastElementChild.onclick = () => {
        closeConfirmDialog();
    };
}


function logFoo() {
    console.log('foo');
}

function toggleOrbitCoords() {
    gameOptions.showOrbitDebugInfo = !gameOptions.showOrbitDebugInfo;

    orbitCoordsButton = document.getElementById('orbitCoordsButton');

    orbitCoordsButton.innerText = "Orbit Coordinates: " +
        ( gameOptions.showOrbitDebugInfo ? 'On' : 'Off' );
}

function isComputerPlayerCurrentPlayer()
{
    return computerPlayerNumbers.includes(currentPlayerNumber);
}