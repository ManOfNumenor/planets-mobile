var trilane = {
    playerCount: 2,
	//randomize_on_load: true,
    sun: {
        isBinaryStar: false,
        imageVar: sunRedGiant,
        sunspotsEnabled: true,
        radius: 70,
    },
    orbits: [
        {
            radius: 130,
            stepCount: 6,
            rotation: 0,
        },
        {
            radius: 350,
            stepCount: 9,
            rotation: Math.PI / 9,
        },
        {
            radius: 650,
            stepCount: 12,
            rotation: 0, //Math.PI / 4,
        },
    ],
    connections: [
        // coordinate format
        // [ innerOrbitIdx, innerStepIdx, outerOrbitIdx, outerStepIdx ],
        [0, 0, 2, 0],
		[0, 2, 1, 2],
		[0, 4, 1, 6],
		
		[1, 0, 2, 2],
		[1, 8, 2, 10],
		
		[1, 4, 2, 5],
		[1, 4, 2, 7],
		
		[2, 2, 2, 5],
		[2, 7, 2, 10],
    ],

    planets: [
		{
			name:"Koraxian Prime",
			description:"Super-heated lava planet.",
			orbitIdx: 0,
			startingStepIdx: 1,
			color: 'red',
			size:1,
			ownedByPlayer: 1,
			hasClouds: false,
			//imageVar: planet16x16,
			lava:1.0, // opacity of lava
		},
		{
			name:"Objectus",
			description:"Super-dense gas giant",
			orbitIdx: 0,
			startingStepIdx: 3,
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
			orbitIdx: 0,
			startingStepIdx: 5,
			color: 'lime',
			size:2,
			ownedByPlayer: 1,
			hasClouds: true,
			atmosphereColor: 'rgba(0, 255, 255, 0.5)',
			//imageVar: planet32x32,
			ice:0.6, // alpha of ice overlay, 0 is default none
			polarIce:1.0, // very distinct ice poles
		},
		
		{
			name:"Asteroid",
			description:"A lush, dense, jungle-planet.",
			orbitIdx: 1,
			startingStepIdx: 1,
			color: 'grey',
			size: 1,
			ownedByPlayer: 0,
			hasClouds: false,
			cloudStretchScale:16,
			rings: false,
			ringAngle: -8, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:0.0, // albedo %
		},
		{
			name:"Asteroid",
			description:"A lush, dense, jungle-planet.",
			orbitIdx: 1,
			startingStepIdx: 3,
			color: 'grey',
			size: 1,
			ownedByPlayer: 0,
			hasClouds: false,
			cloudStretchScale:16,
			rings: false,
			ringAngle: -8, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:0.0, // albedo %
		},
		{
			name:"Asteroid",
			description:"A lush, dense, jungle-planet.",
			orbitIdx: 1,
			startingStepIdx: 5,
			color: 'grey',
			size: 1,
			ownedByPlayer: 0,
			hasClouds: false,
			cloudStretchScale:16,
			rings: false,
			ringAngle: -8, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:0.0, // albedo %
		},
		{
			name:"Asteroid",
			description:"A lush, dense, jungle-planet.",
			orbitIdx: 1,
			startingStepIdx: 7,
			color: 'grey',
			size: 2,
			ownedByPlayer: 0,
			hasClouds: false,
			cloudStretchScale:16,
			rings: false,
			ringAngle: -8, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:0.0, // albedo %
		},
		
		{
			name:"Derelictus",
			description:"A wasteland of ancient craters.",
			orbitIdx: 2,
			startingStepIdx: 3,
			color: 'grey',
			size: 2,
			ownedByPlayer: 2,
			hasClouds: false,
			//imageVar: planet64x64
			craters:1.0, // the opacity of the craters overlay
		},
		{
			name:"Vasturia",
			description:"A lush, dense, jungle-planet.",
			orbitIdx: 2,
			startingStepIdx: 6,
			color: 'darkgreen',
			size: 2,
			ownedByPlayer: 2,
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
			orbitIdx: 2,
			startingStepIdx: 9,
			color: 'brown',
			size: 3,
			ownedByPlayer: 2,
			hasClouds: true,
			cloudStretchScale:16,
			rings:false, // TODO: could be [angle,radius,opacity]
			ringAngle: 30, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:1.5, // albedo %
		},
    ],
};
