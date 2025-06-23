var planets = [
    // {
    //     // orbitRadius: 50,
    //     // orbitSteps: 2,
    //     orbitIdx: 0,
    //     color: 'red',
    //     radius: 10,
    //     x: null,
    //     y: null,
    // },
    // {
    //     // orbitRadius: 80,
    //     // orbitSteps: 3,
    //     orbitIdx: 1,
    //     color: '#ff00ff',
    //     radius: 14,
    //     x: null,
    //     y: null,
    // },
    // {
    //     // orbitRadius: 120,
    //     // orbitSteps: 15,
    //     orbitIdx: 2,
    //     color: 'lime',
    //     radius: 20,
    //     x: null,
    //     y: null,
    // },
];

// function getPlanetAng(planet) {
//     let orbitAnf
//     let orbitStepNumber = 
// }

function movePlanets() {
    // for(const planet of planets) {
    //     let currentStepAng = 
    //         getCurrentStepAng(planet);
    //     let orbit = orbits[planet.orbitIdx];
    //     let planetCoords = distAngAndOriginToXY(
    //         orbit.radius * scaleFactor,
    //         currentStepAng,
    //         sun);

    //     planet.x = planetCoords.x;
    //     planet.y = planetCoords.y;
    // }
}

function drawSun() {
    // console.log("drawing the sun! radius:"+sun.radius+" scaleFactor:"+scaleFactor+" which is:"+(sun.radius * scaleFactor * 2)+"px wide");
    // colorCircle(sun.x, sun.y, sun.radius * scaleFactor, sun.color);

    if (!sun.image) {
        // console.log("downloading sun.png");
        sun.image = new Image();
        sun.image.onload = function() { this.loaded=true; }
        sun.image.src = "../images/sun.png";
    }
    
    if (sun.image.loaded) {
        let sunRotation = performance.now() / 30000;
        let imgScale = ((sun.radius*2)/(sun.image.width*(2/3)))*scaleFactor;
        // we need extra scale (the 3/2) because the bitmap has empty region that extend beyond the radius
        // console.log("drawing the sun scaled:"+imgScale+" which is:"+(sun.image.width*imgScale)+"px wide");
        drawBitmapCenteredWithRotationAndScale(sun.image,sun.x,sun.y,sunRotation,imgScale)
        // 2nd layer moves at a diff speed so the "shine lines" overlap and "glitter"
        drawBitmapCenteredWithRotationAndScale(sun.image,sun.x,sun.y,-sunRotation/3,imgScale)
    }
}

function drawPlanets() {
    if(!orbits || orbits.length < 1) {
        return; // no orbits, don't draw planets
    }

    // draw sun
    drawSun();

    for(const planet of planets) {
        // draw orbit path
        // let arcLength = (2 * Math.PI)/
        //     planet.orbitSteps;
        // let gapLength = 0.1;

        // for(let i=0;i<planet.orbitSteps;i++) {
        //     let startAng = (i * arcLength); // -
        //         // (Math.PI/2);
        //     // subtract PI/2 to start at 'North'
        //     // instead of 'East'

        //     let endAng = (startAng + arcLength) -
        //         gapLength;

        //     canvasContext.strokeStyle = 'white';
        //     canvasContext.beginPath();
        //     canvasContext.arc(sun.x, sun.y,
        //         planet.orbitRadius * scaleFactor,
        //         startAng, endAng);
        //     canvasContext.stroke();

        // }

        // draw planet itself
        // let currentStepAng = 
        //     getCurrentStepAng(planet);
        let step = orbits[planet.orbitIdx].steps[planet.stepIdx];

        if(logThisRound) {
            // debug('planet: '+planet.color+
            //     ', currentStep: '+currentStepNumber+
            //     ', currentStepAng: '+
            //     radiantsToDegrees(currentStepAng)
            // );
        }
        /*
        let drawCoords = distAngAndOriginToXY(
            planet.orbitRadius * scaleFactor,
            currentStepAng,
            sun);
            */

        // planets are no longer selectable, but 
        // leaving this here just in case that 
        // changes later on
        // let selectedPlanetHighlightRadius = 5;
        // if(selectedEntity == planet) {
        //     colorCircle(planet.x,
        //         planet.y,
        //         (planet.radius + selectedPlanetHighlightRadius) *
        //         scaleFactor, 
        //         'cyan');
        // }

        colorCircle(step.x, step.y,
            planet.radius * scaleFactor, planet.color);

    }

    logThisRound = false;

}


// function getCurrentStepAng(planet) {
//     let orbit = orbits[planet.orbitIdx];
// 
//     let planetArcLength = (2 * Math.PI)/
//         orbit.stepCount;
//     let currentStepNumber = turnNumber % 
//         orbit.stepCount;
//     let currentStepAng = (currentStepNumber *
//         planetArcLength) + orbit.rotation; 
//     // - (Math.PI/2);
//     // subtract PI/2 to start at 'North'
//     // instead of 'East'
// 
//     return currentStepAng;
// }
