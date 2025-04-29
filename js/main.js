var canvas, canvasContext;
var turnNumber = 0;
var logThisRound = true;
var selectedEntity = null;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    setupInput();
    setupSun();
    resizeCanvas();

    let framesPerSecond = 30;
    setInterval(updateEverything, 1000/framesPerSecond);

}

function updateEverything() {
    moveEverything();
    drawEverything();
}

function moveEverything() {
    movePlanets();
    moveFleets();
}

function drawEverything() {
    // background
    colorRect(0,0, canvas.width,canvas.height, 'black');
    drawPlanets();
    drawFleets();

}

function radiantsToDegrees(angRadiants) {
    return angRadiants * (180 / Math.PI);
}

function debug(message) {
    console.log('debug:', message);
    let debugP = document.getElementById('debug');

    debugP.innerHTML += message + '<br/><br/>';
}

function endTurn() {
    turnNumber++;
    // debug("turn "+turnNumber);
    // logThisRound = true;
}

function resizeCanvas() {
    debug('canvas height: ' + canvas.height);
    let canvasRect = canvas.getBoundingClientRect();
    canvas.height = canvasRect.height;
    canvas.width = canvasRect.width;
    debug('height updated: ' + canvas.height);

}
