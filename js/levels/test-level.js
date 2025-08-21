var testLevel = {
    playerCount: 2,
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
            radius: 320,
            stepCount: 12,
            rotation: Math.PI / 4,
        },
        {
            radius: 450,
            stepCount: 16,
            rotation: 0,
        },
    ],
    connections: [
        // coordinate format
        // [ innerOrbitIdx, innerStepIdx, outerOrbitIdx, outerStepIdx ],
        [0, 0, 1, 0],
        [0, 0, 1, 3],
        [0, 1, 1, 1],
        [0, 1, 1, 2],

        [1, 0, 2, 0],
        [1, 0, 2, 1],
        [1, 3, 2, 6],
        [1, 3, 2, 7],
        [1, 0, 2, 1],
        [1, 2, 2, 4],
        [1, 2, 2, 6],
        [1, 1, 2, 2],
        [1, 1, 2, 3],

        [2, 0, 3, 10],
        [2, 0, 3, 11],
        [2, 1, 3, 1],
        [2, 2, 3, 3],
        [2, 3, 3, 4],
        [2, 4, 3, 6],
        [2, 5, 3, 7],
        [2, 6, 3, 9],
        [2, 7, 3, 10],

        [3, 11, 4, 2],
        [3, 2, 4, 4],
        [3, 4, 4, 6],
        [3, 4, 4, 8],
        [3, 6, 4, 9],
        [3, 8, 4, 11],
        [3, 8, 4, 13],
        [3, 9, 4, 15],
        [3, 11, 4, 0],
    ],

    planets: [
        {
            name:"Koraxian Prime",
            description:"Super-heated lava planet.",
            orbitIdx: 0,
            startingStepIdx: 0,
            color: 'red',
            size:1,
            moons:[[22,6,2]], // [distance,speed,radius]
            ownedByPlayer: 0,
            hasClouds: false,
            //imageVar: planet16x16,
            lava:1.0, // opacity of lava
        },
        {
            name:"Objectus",
            description:"Super-dense gas giant",
            orbitIdx: 1,
            startingStepIdx: 0,
            color: '#ff00ff',
            size:1,
            moons:[[26,-0.6,3],[20,-1.2,1]], // [distance,speed,radius]
            ownedByPlayer: 2,
            hasClouds: true,
            cloudStretchScale: 10, // >1 for long jupiter style clouds
            atmosphereColor: 'rgba(0, 255, 0, 0.5)',
            // imageVar: planet24x24,
        },
        {
            name:"Ganth II",
            description:"It's icy core creates huge storms.",
            orbitIdx: 2,
            startingStepIdx: 1,
            color: 'lime',
            size:2,
            moons:[[26,1.5,2]], // [distance,speed,radius]
            ownedByPlayer: 0,
            hasClouds: true,
            atmosphereColor: 'rgba(0, 255, 255, 0.5)',
            //imageVar: planet32x32,
            ice:0.6, // alpha of ice overlay, 0 is default none
            polarIce:1.0, // very distinct ice poles
        },
        {
            name:"Derelictus",
            description:"A wasteland of ancient craters.",
            orbitIdx: 3,
            startingStepIdx: 1,
            color: 'grey',
            size: 3,
            ownedByPlayer: 1,
            hasClouds: false,
            //moons:[[32,1,1]], // [distance,speed,radius]
            //imageVar: planet64x64
            craters:1.0, // the opacity of the craters overlay
        },
        {
            name:"Vasturia",
            description:"A lush, dense, jungle-planet.",
            orbitIdx: 4,
            startingStepIdx: 1,
            color: 'darkgreen',
            size: 3,
            moons:[[36,2,1],[40,1.5,1],[44,1,1],[48,0.5,2]], // [distance,speed,radius]
            ownedByPlayer: 0,
            hasClouds: true,
            cloudStretchScale:16,
            rings:true, // TODO: could be [angle,radius,opacity]
            ringAngle: 30, // degrees (0 = horizontal)
            //imageVar: planet128x128,
            polarIce:1.0, // albedo %
        },
    ],
};
