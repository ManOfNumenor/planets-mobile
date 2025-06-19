function loadLevel(levelObj) {
    // console.log('loading level', levelObj);

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
    connections = levelObj.connections;

    // planets
    planets = [];
    for(const levelPlanet of levelObj.planets) {
        planets.push({
            color: levelPlanet.color,
            radius: levelPlanet.radius,
            orbitIdx: levelPlanet.orbitIdx,
            stepIdx: levelPlanet.startingStepIdx,
        });
    }
}
