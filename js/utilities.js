var gameOptions = {
    showOrbitDebugInfo: true,
    showPointerDebugInfo: false,
    starfieldStarsPerLayer: 100,
    starfieldLayerCount: 3,
    starfieldWidth: 1000,
    starfieldHeight: 1000,
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
