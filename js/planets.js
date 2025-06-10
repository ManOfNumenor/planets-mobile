var planets = [
    {
        // orbitRadius: 50,
        // orbitSteps: 2,
        orbitIdx: 0,
        color: 'red',
        radius: 10,
        x: null,
        y: null,
    },
    {
        // orbitRadius: 80,
        // orbitSteps: 3,
        orbitIdx: 1,
        color: '#ff00ff',
        radius: 14,
        x: null,
        y: null,
    },
    {
        // orbitRadius: 120,
        // orbitSteps: 15,
        orbitIdx: 2,
        color: 'lime',
        radius: 20,
        x: null,
        y: null,
    },
];

// function getPlanetAng(planet) {
//     let orbitAnf
//     let orbitStepNumber = 
// }

function movePlanets() {
    for(const planet of planets) {
        let currentStepAng = 
            getCurrentStepAng(planet);
        let orbit = orbits[planet.orbitIdx];
        let planetCoords = distAngAndOriginToXY(
            orbit.radius * scaleFactor,
            currentStepAng,
            sun);

        planet.x = planetCoords.x;
        planet.y = planetCoords.y;
    }
}

function drawPlanets() {
    // draw sun
    colorCircle(sun.x, sun.y, sun.radius * scaleFactor, sun.color);

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
        let currentStepAng = 
            getCurrentStepAng(planet);

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

        colorCircle(planet.x, planet.y,
            planet.radius * scaleFactor, planet.color);

    }

    logThisRound = false;

}


function getCurrentStepAng(planet) {
    let orbit = orbits[planet.orbitIdx];

    let planetArcLength = (2 * Math.PI)/
        orbit.stepCount;
    let currentStepNumber = turnNumber % 
        orbit.stepCount;
    let currentStepAng = (currentStepNumber *
        planetArcLength) + orbit.rotation; 
    // - (Math.PI/2);
    // subtract PI/2 to start at 'North'
    // instead of 'East'

    return currentStepAng;
}
