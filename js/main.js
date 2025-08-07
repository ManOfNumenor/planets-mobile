var canvas, canvasContext;
var turnNumber = 0;
var logThisRound = true;
var selectedEntity = null;
var scaleFactor = 1.0;

var selectedFleetInfoDiv = document.getElementById('selectedFleetInfoDiv');

window.onload = function() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasContext.imageSmoothingEnabled = false;  // doesn't seem to be working?

	colorRect(0,0, canvas.width,canvas.height, "black");
	colorText("Loading...", canvas.width/2,canvas.height/2, "white");

	loadImages();
}

function imageLoadingDoneSoStartGame() {
    console.log('imageLoadingDoneSoStartGame');
    setupInput();
    setupPause(); 
    // setupSun();
    //loadLevel(testLevel);
    showMenu('main');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let framesPerSecond = 30;
    setInterval(updateEverything, 1000/framesPerSecond);
}

function updateEverything() {
    if (!isPaused) {
      moveEverything();
    }
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
    
    if (endTurnSound) endTurnSound.play();

    advancePlayerNumber();

    if(currentPlayerNumber === 0) {
        turnNumber++;
        movePlanetsAndProduceShips();

        advancePlayerNumber();
    }

    //window.alert(`player ${currentPlayerNumber}'s turn`);
    alertDialog(`player ${currentPlayerNumber}'s turn`);

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
    // debug('x: ' + xOffset +', y: ' + yOffset);

    return {
        x: origin.x + xOffset,
        y: origin.y + yOffset,
    };
}
