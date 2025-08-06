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
            size: levelPlanet.size,
            radius: PLANET_SIZE_RADIAI[levelPlanet.size],
            orbitIdx: levelPlanet.orbitIdx,
            stepIdx: levelPlanet.startingStepIdx,
            imageVar: levelPlanet.imageVar,
            //moons: levelPlanet.moons,
            hasClouds: levelPlanet.hasClouds,
            rings: levelPlanet.rings,
            ownedByPlayer: levelPlanet.ownedByPlayer,
            atmosphereColor: levelPlanet.atmosphereColor,
        });
    }

    // finally, show who's first
    //window.alert(`player ${currentPlayerNumber}'s turn`);
    alertDialog(`player ${currentPlayerNumber}'s turn`);
}

function randomizeLevel() {

    for (let i=0; i<orbits.length; i++) {
        // todo: random number of planets+orbits from 1-10
        // be sure to delete or make new planets if so
    }

    for (let i=0; i<connections.length; i++) {
        // calculate via max distance check between steps and orbits
        // complex multidimensional array - tricky
    }

    for (let i=0; i<planets.length; i++) {
            planets[i].color = randomPlanetColor();
            planets[i].size = randomPlanetSize();
            planets[i].radius = randomPlanetRadius();
            
            // leave it be for now
            // planets[i].orbitIdx = levelPlanet.orbitIdx;
            
            // could pick from 0-orbits[i].steps.length;
            // stored initially in levelPlanet.startingStepIdx;
            planets[i].stepIdx = Math.floor(Math.random()*orbits[planets[i].orbitIdx].steps.length);
            
            // pick from random array of special sprites?
            // planets[i].imageVar = levelPlanet.imageVar;

            planets[i].hasClouds = Math.random()<0.5;
            planets[i].rings = Math.random()<0.15;
            planets[i].atmosphereColor = randomPlanetColor();

            // reset ownership
            planets[i].ownedByPlayer = 0; 

    }

    // todo: reset fleets? 
    // if so, also change ownedByPlayer above

}

function randomPlanetColor() {
    let r = Math.random()*255;
    let g = Math.random()*255;
    let b = Math.random()*255;
    let a = 1;
    return "rgba("+r+","+g+","+b+","+a+")";
}

function randomPlanetSize() { // 1-3
    return 1+Math.ceil(Math.random()*2);
}

function randomPlanetRadius() { // 12-32
    let min = 12;
    let range = 20;
    return min+Math.round(Math.random()*range);
}