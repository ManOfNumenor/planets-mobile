const PLANET_SIZE_RADIAI = [
    0, // asteroids, they'll probably be handled differently somehow
    16,
    20,
    32,
];

function loadLevel(levelObj) {
    // console.log('loading level', levelObj);
    playerCount = levelObj.playerCount;
    currentPlayerNumber = 1;

    // sun
    setupSun(); // TODO: specify sun sprite based on level data

    // orbits
    orbits = [];
    for(const levelOrbit of levelObj.orbits) {
        let tmpOrbit = {
            radius: levelOrbit.radius,
            rotation: levelOrbit.rotation,
            centerObj: sun,
            steps: [],
        };
        
        for(let i=0;i<levelOrbit.stepCount;i++) {
            tmpOrbit.steps.push({
                x: null,
                y: null,
            });
        }

        orbits.push(tmpOrbit);
    }

    // connections
    //connections = levelObj.connections;
    for(const connArray of levelObj.connections) {
        connections.push({
            innerOrbitIdx: connArray[0],
            innerStepIdx: connArray[1],
            outerOrbitIdx: connArray[2],
            outerStepIdx: connArray[3],
        });
    }

    // planets
    planets = [];
    for(const levelPlanet of levelObj.planets) {
        planets.push({
            color: levelPlanet.color,
            radius: PLANET_SIZE_RADIAI[levelPlanet.size],
            orbitIdx: levelPlanet.orbitIdx,
            stepIdx: levelPlanet.startingStepIdx,
            imageVar: levelPlanet.imageVar,
            //moons: levelPlanet.moons,
            hasClouds: levelPlanet.hasClouds,
            rings: levelPlanet.rings,
            ownedByPlayer: levelPlanet.ownedByPlayer,
        });
    }
}
