var canvas, canvasContext;
var turnNumber = 0;
var logThisRound = true;
var selectedEntity = null;
var scaleFactor = 1.0;

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    setupInput();
    // setupSun();
    loadLevel(testLevel);
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let framesPerSecond = 30;
    setInterval(updateEverything, 1000/framesPerSecond);

}

function updateEverything() {
    moveEverything();
    drawEverything();
}

function moveEverything() {
    moveOrbits();
    movePlanets();
    moveFleets();
}

function drawEverything() {
    // background
    colorRect(0,0, canvas.width,canvas.height, 'black');

    drawStarfield();
    drawOrbits();
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
    // TODO: loop through planets and update
    // stepIdx values, re-setting to 0
    // if stepIdx >= orbit.steps.length

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

function distAngAndOriginToXY(dist, angRadiants,
    origin) {
    // note: origin _must_ have `x` and `y`
    // properties

    // debug('dist: '+dist+', angRadiants: '+angRadiants+', origin:'+origin.x+' '+origin.y);

    // let angDegrees = radiantsToDegrees(angRadiants);
    // debug('angDegrees: '+angDegrees);
    let xOffset = Math.cos(angRadiants) * dist;
    let yOffset = Math.sin(angRadiants) * dist;
    // TODO: debug func & output 'planet' func
    // debug('x: ' + xOffset +', y: ' + yOffset);

    return {
        x: origin.x + xOffset,
        y: origin.y + yOffset,
    };
}
