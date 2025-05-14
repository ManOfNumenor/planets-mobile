var planets = [
    {
        orbitRadius: 50,
        orbitSteps: 2,
        color: 'red',
        radius: 10,
        x: null,
        y: null,
    },
    {
        orbitRadius: 80,
        orbitSteps: 3,
        color: '#ff00ff',
        radius: 12,
        x: null,
        y: null,
    },
    {
        orbitRadius: 120,
        orbitSteps: 15,
        color: 'lime',
        radius: 18,
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
        let planetCoords = distAngAndOriginToXY(
            planet.orbitRadius * scaleFactor,
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
        let arcLength = (2 * Math.PI)/
            planet.orbitSteps;
        let gapLength = 0.1;

        for(let i=0;i<planet.orbitSteps;i++) {
            let startAng = (i * arcLength); // -
                // (Math.PI/2);
            // subtract PI/2 to start at 'North'
            // instead of 'East'

            let endAng = (startAng + arcLength) -
                gapLength;

            canvasContext.strokeStyle = 'white';
            canvasContext.beginPath();
            canvasContext.arc(sun.x, sun.y,
                planet.orbitRadius * scaleFactor,
                startAng, endAng);
            canvasContext.stroke();

        }

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

        let selectedPlanetHighlightRadius = 5;
        if(selectedEntity == planet) {
            colorCircle(planet.x,
                planet.y,
                (planet.radius + selectedPlanetHighlightRadius) *
                scaleFactor, 
                'cyan');
        }

        colorCircle(planet.x, planet.y,
            planet.radius * scaleFactor, planet.color);

    }

    logThisRound = false;

}


function getCurrentStepAng(planet) {
    let planetArcLength = (2 * Math.PI)/
        planet.orbitSteps;
    let currentStepNumber = turnNumber % 
        planet.orbitSteps;
    let currentStepAng = (currentStepNumber *
        planetArcLength); // - (Math.PI/2);
    // subtract PI/2 to start at 'North'
    // instead of 'East'

    return currentStepAng;
}
