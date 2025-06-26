var planets = [];

function movePlanets() {
    //
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
        // the 2/3 above is because the bitmap has outer glow/shine lines that extend beyond the radius
        // console.log("drawing the sun scaled:"+imgScale+" which is:"+(sun.image.width*imgScale)+"px wide");
        drawBitmapCenteredWithRotationAndScale(sun.image,sun.x,sun.y,sunRotation,imgScale)
        // 2nd layer moves at a diff speed so the "shine lines" overlap and "glitter"
        drawBitmapCenteredWithRotationAndScale(sun.image,sun.x,sun.y,-sunRotation*.666,imgScale)
    }
}

function drawPlanets() {
    if(!orbits || orbits.length < 1) {
        return; // no orbits, don't draw planets
    }

    // draw sun
    drawSun();

    for(const planet of planets) {
        let step = orbits[planet.orbitIdx].steps[planet.stepIdx];

        if(logThisRound) {
            //
        }

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

        if(planet.imageVar) {
            drawBitmapCenteredWithRotationAndScale(
                planet.imageVar, 
                step.x, step.y, 
                0,
                scaleFactor
            );
        } else {
            colorCircle(step.x, step.y,
                planet.radius * scaleFactor, planet.color);
        }

        // draw planet shadow
        shadeCircle(step.x, step.y,
                planet.radius * scaleFactor);

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
