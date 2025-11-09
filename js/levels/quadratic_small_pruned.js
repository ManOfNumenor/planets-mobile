var quadraticSmallPruned = {
    playerCount: 4,
    randomize_on_load: true,
    sun: {
        isBinaryStar: false,
        imageVar: sunRedGiant,
        sunspotsEnabled: true,
        radius: 42,
    },
    orbits: [
        {
            radius: 75,
            stepCount: 2,
            rotation: 0,
        },
        {
            radius: 130,
            stepCount: 4,
            rotation: 'half', // Math.PI / stepCount,
            prune_chance: 0.2,
        },
        {
            radius: 210,
            stepCount: 8,
            rotation: 0,
            prune_chance: 0.24,
        },
        {
            radius: 320,
            stepCount: 16,
            rotation: 0,
            prune_chance: 0.27,
        },
        {
            radius: 450,
            stepCount: 32,
            rotation: 0,
            prune_chance: 0.3,
        },
    ],
    connections: [
        // coordinate format
        // [ innerOrbitIdx, innerStepIdx, outerOrbitIdx, outerStepIdx ],
        [0, 0, 1, 0],
        [0, 0, 1, 3],
        [0, 1, 1, 1],
        [0, 1, 1, 2],

        [1, 0, 2, 1],
        [1, 0, 2, 2],
        [1, 1, 2, 3],
        [1, 1, 2, 4],
        [1, 2, 2, 5],
        [1, 2, 2, 6],
        [1, 3, 2, 7],
        [1, 3, 2, 0],

        [2, 0, 3, 0],
        [2, 0, 3, 1],
        [2, 1, 3, 2],
        [2, 1, 3, 3],
        [2, 2, 3, 4],
        [2, 2, 3, 5],
        [2, 3, 3, 6],
        [2, 3, 3, 7],
        [2, 4, 3, 8],
        [2, 4, 3, 9],
        [2, 5, 3, 10],
        [2, 5, 3, 11],
        [2, 6, 3, 12],
        [2, 6, 3, 13],
        [2, 7, 3, 14],
        [2, 7, 3, 15],

        [3, 0, 4, 0],
        [3, 0, 4, 1],
        [3, 1, 4, 2],
        [3, 1, 4, 3],
        [3, 2, 4, 4],
        [3, 2, 4, 5],
        [3, 3, 4, 6],
        [3, 3, 4, 7],
        [3, 4, 4, 8],
        [3, 4, 4, 9],
        [3, 5, 4, 10],
        [3, 5, 4, 11],
        [3, 6, 4, 12],
        [3, 6, 4, 13],
        [3, 7, 4, 14],
        [3, 7, 4, 15],
        [3, 8, 4, 16],
        [3, 8, 4, 17],
        [3, 9, 4, 18],
        [3, 9, 4, 19],
        [3, 10, 4, 20],
        [3, 10, 4, 21],
        [3, 11, 4, 22],
        [3, 11, 4, 23],
        [3, 12, 4, 24],
        [3, 12, 4, 25],
        [3, 13, 4, 26],
        [3, 13, 4, 27],
        [3, 14, 4, 28],
        [3, 14, 4, 29],
        [3, 15, 4, 30],
        [3, 15, 4, 31],
    ],

    planets: [
        {
            name:"Koraxian Prime",
            description:"Super-heated lava planet.",
            orbitIdx: 0,
            startingStepIdx: 0,
            color: 'red',
            size:1,
            ownedByPlayer: 0,
            hasClouds: false,
            //imageVar: planet16x16,
            lava:1.0, // opacity of lava
        },
        {
            name:"Objectus",
            description:"Super-dense gas giant",
            orbitIdx: 1,
            startingStepIdx: 1,
            color: '#ff00ff',
            size:2,
            ownedByPlayer: 1,
            hasClouds: true,
            cloudStretchScale: 10, // >1 for long jupiter style clouds
            atmosphereColor: 'rgba(0, 255, 0, 0.5)',
            // imageVar: planet24x24,
        },
        {
            name:"Ganth II",
            description:"It's icy core creates huge storms.",
            orbitIdx: 2,
            startingStepIdx: 7,
            color: 'lime',
            size:2,
            ownedByPlayer: 2,
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
            size: 2,
            ownedByPlayer: 3,
            hasClouds: false,
            //imageVar: planet64x64
            craters:1.0, // the opacity of the craters overlay
        },
        {
            name:"Vasturia",
            description:"A lush, dense, jungle-planet.",
            orbitIdx: 3,
            startingStepIdx: 5,
            color: 'darkgreen',
            size: 2,
            ownedByPlayer: 4,
            hasClouds: true,
            cloudStretchScale:16,
            rings:true, // TODO: could be [angle,radius,opacity]
            ringAngle: -30, // degrees (0 = horizontal)
            //imageVar: planet128x128,
            polarIce:1.0, // albedo %
        },
        {
            name:"Vasturia",
            description:"A lush, dense, jungle-planet.",
            orbitIdx: 3,
            startingStepIdx: 9,
            color: 'brown',
            size: 3,
            ownedByPlayer: 0,
            hasClouds: true,
            cloudStretchScale:16,
            rings:false, // TODO: could be [angle,radius,opacity]
            ringAngle: 30, // degrees (0 = horizontal)
            //imageVar: planet128x128,
            polarIce:1.5, // albedo %
        },
        {
            name:"Tutorialis",
            description:"A gentle wonder.",
            orbitIdx: 3,
            startingStepIdx: 13,
            color: 'blue',
            size: 3,
            ownedByPlayer: 0,
            hasClouds: true,
            //imageVar: planet64x64
            craters:1.0, // the opacity of the craters overlay
        },

        // "asteroids"
        {
            name:"asterioid1",
            description:"",
            orbitIdx: 4,
            startingStepIdx: 0,
            color: 'lightgrey',
            size: 1,
            ownedByPlayer: 0,
            hasClouds: false,
            cloudStretchScale:16,
            rings:false, // TODO: could be [angle,radius,opacity]
            ringAngle: 30, // degrees (0 = horizontal)
            //imageVar: planet128x128,
            //polarIce:1.0, // albedo %
            craters:1.0, // the opacity of the craters overlay
        },
        {
            name:"asterioid2",
            description:"",
            orbitIdx: 4,
            startingStepIdx: 7,
            color: 'darkgrey',
            size: 1,
            ownedByPlayer: 0,
            hasClouds: false,
            cloudStretchScale:16,
            rings:false, // TODO: could be [angle,radius,opacity]
            ringAngle: 30, // degrees (0 = horizontal)
            //imageVar: planet128x128,
            //polarIce:1.0, // albedo %
            craters:1.0, // the opacity of the craters overlay
        },
        {
            name:"asterioid3",
            description:"",
            orbitIdx: 4,
            startingStepIdx: 15,
            color: '#f0f0f0',
            size: 1,
            ownedByPlayer: 0,
            hasClouds: false,
            cloudStretchScale:16,
            rings:false, // TODO: could be [angle,radius,opacity]
            ringAngle: 30, // degrees (0 = horizontal)
            //imageVar: planet128x128,
            //polarIce:1.0, // albedo %
            craters:1.0, // the opacity of the craters overlay
        },
        {
            name:"asterioid4",
            description:"",
            orbitIdx: 4,
            startingStepIdx: 18,
            color: '#3f3f3f',
            size: 1,
            ownedByPlayer: 0,
            hasClouds: false,
            rings:false, // TODO: could be [angle,radius,opacity]
            //imageVar: planet128x128,
            craters:0.5, // the opacity of the craters overlay
            ice: 0.8,
        },
        {
            name:"asterioid5",
            description:"",
            orbitIdx: 4,
            startingStepIdx: 23,
            color: '#3f3f3f',
            size: 1,
            ownedByPlayer: 0,
            hasClouds: false,
            rings:false, // TODO: could be [angle,radius,opacity]
            //imageVar: planet128x128,
            craters:0.2, // the opacity of the craters overlay
            ice: 0.3,
        },
        {
            name:"asterioid5",
            description:"",
            orbitIdx: 4,
            startingStepIdx: 31,
            color: '#3f3f3f',
            size: 1,
            ownedByPlayer: 0,
            hasClouds: false,
            rings:false, // TODO: could be [angle,radius,opacity]
            //imageVar: planet128x128,
            craters: 0.8, // the opacity of the craters overlay
            ice: 0,
        },
    ],
};
