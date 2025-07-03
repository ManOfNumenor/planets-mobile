const UNIT_SQUARE_DEFAULT_SIZE = 18;
var allFleets = [
    {
        ships: 10,

        // should be at _either_ a planet
        // (& therefore moving with the planet)
        planetIdx: 3,

        // OR at an orbit & idx point
        // (& therefore not moving with planets)
        orbitIdx: null,
        stepIdx: null,
    },
    {
        ships: 10,
        planetIdx: 1,
        orbitIdx: null,
        stepIdx: null,
    }
];

function moveFleets() {
    // for(const fleet of allFleets) {
    //     let planet = planets[fleet.planetIdx];
    //     fleet.x = planet.x;
    //     fleet.y = planet.y;
    // }
}

function drawFleets() {
    let drawWidth = UNIT_SQUARE_DEFAULT_SIZE * scaleFactor;
    const selectedCircleRadius = drawWidth + 3;

    for(const fleet of allFleets) {

        fleetStep = getFleetStep(fleet);

        let fleetX = fleetStep.x;
        let fleetY = fleetStep.y;

        let drawX = fleetX - (drawWidth / 2);
        let drawY = fleetY - (drawWidth / 2);

        if(selectedEntity && selectedEntity == fleet){
            colorCircle(fleetX,fleetY, drawWidth, 'cyan');
        }
        colorRect(drawX,drawY, drawWidth,drawWidth, 'yellow');
    }
}

function getFleetStep(fleet) {
    let fleetStep = null;
    if(fleet.planetIdx || fleet.planetIdx === 0) {
        // use planet coords
        let planet = planets[fleet.planetIdx];
        fleetStep = orbits[planet.orbitIdx].steps[planet.stepIdx];

    } else {
        // use fleet step coords
        fleetStep = orbits[fleet.orbitIdx].steps[fleet.stepIdx];

    }

    return fleetStep;
}
