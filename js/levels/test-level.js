var testLevel = {
    orbits: [
        {
            radius: 75,
            stepCount: 2,
            rotation: 0,
        },
        {
            radius: 130,
            stepCount: 4,
            rotation: Math.PI / 4,
        },
        {
            radius: 210,
            stepCount: 8,
            rotation: 0,
        },
        {
            radius: 290,
            stepCount: 12,
            rotation: Math.PI / 4,
        },
        {
            radius: 380,
            stepCount: 16,
            rotation: 0,
        },
    ],
    connections: [
        { 
            innerOrbitIdx: 0, 
            innerStepIdx: 0,
            outerOrbitIdx: 1, 
            outerStepIdx: 0,
            direction: "outward",
        },
        { 
            innerOrbitIdx: 0, 
            innerStepIdx: 0,
            outerOrbitIdx: 1, 
            outerStepIdx: 3,
            direction: "inward",
        },
        { 
            innerOrbitIdx: 1, 
            innerStepIdx: 2,
            outerOrbitIdx: 2, 
            outerStepIdx: 6,
            direction: "outward",
        },
        {
            innerOrbitIdx: 1,
            innerStepIdx: 2,
            outerOrbitIdx: 2,
            outerStepIdx: 4,
            direction: "inward",
        },
    ],
    planets: [
        {
            orbitIdx: 0,
            startingStepIdx: 0,
            color: 'red',
            size:1,
            moons:[[22,6,2]], // [distance,speed,radius]
            //radius: 16,
            //imageVar: planet16x16,
            //size:1,
        },
        {
            orbitIdx: 1,
            startingStepIdx: 0,
            color: '#ff00ff',
            size:1,
            moons:[[26,-0.6,3],[20,-1.2,1]], // [distance,speed,radius]
            //radius: 16,
            // imageVar: planet24x24,
        },
        {
            orbitIdx: 2,
            startingStepIdx: 1,
            color: 'lime',
            size:2,
            moons:[[26,1.5,2]], // [distance,speed,radius]
            //radius: 16,
            //imageVar: planet32x32,
        },
        {
            orbitIdx: 3,
            startingStepIdx: 1,
            color: 'aliceblue',
            size: 3,
            //moons:[[32,1,1]], // [distance,speed,radius]
            //radius: 20,
            //imageVar: planet64x64
        },
        {
            orbitIdx: 4,
            startingStepIdx: 1,
            color: 'darkgreen',
            size: 3,
            moons:[[36,2,1],[40,1.5,1],[44,1,1],[48,0.5,2]], // [distance,speed,radius]
            //radius: 20,
            //imageVar: planet128x128,
        },
    ],
};
