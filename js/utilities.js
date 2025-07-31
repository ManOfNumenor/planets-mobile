var gameOptions = {
    showOrbitDebugInfo: true,
    showPointerDebugInfo: false,
    starfieldStarsPerLayer: 10000,
    starfieldLayerCount: 3,
    starfieldWidth: 4000,
    starfieldHeight: 4000,
    radialPlanetShadows: false,
};

function resetGameOptions() {
    showOrbitDebugInfo = true;
    showPointerDebugInfo = false;
    starfieldStarsPerLayer = 10000;
    starfieldLayerCount = 3;
    starfieldWidth = 4000;
    starfieldHeight = 4000;
    radialPlanetShadows =  false;
}

function alertDialog(message) {
    let dialog = document.getElementById('alertDialog');

    dialog.firstElementChild.innerText = message;

    dialog.showModal();
}

function closeAlertDialog() {
    let dialog = document.getElementById('alertDialog');
    dialog.close();
}

function testConfirmDialog() {
    let confirmed = confirmDialog('Testing confirmation dialog');

    console.log('confirmed?', confirmed);
}

function confirmDialog(message) {
    let dialog = document.getElementById('confirmDialog');

    dialog.firstElementChild.innerText = message;

    // TODO: promises? 
    // Somehow need to access info about which button gets pressed here
    let returnValue = dialog.showModal();

    console.log('return value', returnValue);
}


