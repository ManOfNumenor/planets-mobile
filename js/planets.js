var planets = [];

function movePlanets() {
    //
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

        if (MOONS_ENABLED) drawAllMoons(planet.moons,step.x,step.y);

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
