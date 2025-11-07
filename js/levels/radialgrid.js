var radialgrid = {
    playerCount: 4,
	//randomize_on_load: true,
    sun: {
        isBinaryStar: false,
        imageVar: sunRedGiant,
        sunspotsEnabled: true,
        radius: 50,
    },
    orbits: [
        {
            radius: 120,
            stepCount: 6,
            rotation: 0,
        },
        {
            radius: 340,
            stepCount: 12,
            rotation: Math.PI / 12,
        },
        {
            radius: 680,
            stepCount: 18,
            rotation: 0, //Math.PI / 4,
        },
    ],
    connections: [
        // coordinate format
        // [ innerOrbitIdx, innerStepIdx, outerOrbitIdx, outerStepIdx ],
        [0, 0, 1, 11],
		[0, 0, 1, 0],
		[0, 1, 1, 1],
		[0, 1, 1, 2],
		[0, 2, 1, 3],
		[0, 2, 1, 4],
		[0, 3, 1, 5],
		[0, 3, 1, 6],
		[0, 4, 1, 7],
		[0, 4, 1, 8],
		[0, 5, 1, 9],
		[0, 5, 1, 10],
		
		[1, 0, 2, 0],
		[1, 0, 2, 1],
		[1, 1, 2, 2],
		[1, 1, 2, 3],
		[1, 2, 2, 3],
		[1, 2, 2, 4],
		[1, 3, 2, 5],
		[1, 3, 2, 6],
		[1, 4, 2, 6],
		[1, 4, 2, 7],
		[1, 5, 2, 8],
		[1, 5, 2, 9],
		
		[1, 6, 2, 9],
		[1, 6, 2, 10],
		[1, 7, 2, 11],
		[1, 7, 2, 12],
		[1, 8, 2, 12],
		[1, 8, 2, 13],
		[1, 9, 2, 14],
		[1, 9, 2, 15],
		[1, 10, 2, 15],
		[1, 10, 2, 16],
		[1, 11, 2, 17],
		[1, 11, 2, 0],
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
			orbitIdx: 0,
			startingStepIdx: 3,
			color: '#ff00ff',
			size:2,
			ownedByPlayer: 0,
			hasClouds: true,
			cloudStretchScale: 10, // >1 for long jupiter style clouds
			atmosphereColor: 'rgba(0, 255, 0, 0.5)',
			// imageVar: planet24x24,
		},
		{
			name:"Ganth II",
			description:"It's icy core creates huge storms.",
			orbitIdx: 1,
			startingStepIdx: 0,
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
			name:"Derelictus",
			description:"A wasteland of ancient craters.",
			orbitIdx: 1,
			startingStepIdx: 6,
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
			ownedByPlayer: 3,
			hasClouds: true,
			cloudStretchScale:16,
			rings:true, // TODO: could be [angle,radius,opacity]
			ringAngle: -30, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:1.0, // albedo %
		},
		{
			name:"Vasturia II",
			description:"A lush, dense, jungle-planet.",
			orbitIdx: 2,
			startingStepIdx: 8,
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
			name:"Vasturia III",
			description:"A lush, dense, jungle-planet.",
			orbitIdx: 2,
			startingStepIdx: 15,
			color: 'brown',
			size: 3,
			ownedByPlayer: 4,
			hasClouds: true,
			cloudStretchScale:16,
			rings:false, // TODO: could be [angle,radius,opacity]
			ringAngle: 30, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:1.5, // albedo %
		},

		// "asteroids"
		{
			name:"asterioid1",
			description:"",
			orbitIdx: 1,
			startingStepIdx: 1,
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
			orbitIdx: 1,
			startingStepIdx: 4,
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
			orbitIdx: 1,
			startingStepIdx: 7,
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
			orbitIdx: 1,
			startingStepIdx: 9,
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
			orbitIdx: 2,
			startingStepIdx: 0,
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
			orbitIdx: 2,
			startingStepIdx: 2,
			color: '#3f3f3f',
			size: 1,
			ownedByPlayer: 0,
			hasClouds: false,
			rings:false, // TODO: could be [angle,radius,opacity]
			//imageVar: planet128x128,
			craters: 0.8, // the opacity of the craters overlay
			ice: 0,
		},
		{
			name:"asterioid6",
			description:"",
			orbitIdx: 2,
			startingStepIdx: 7,
			color: '#3f3f3f',
			size: 1,
			ownedByPlayer: 0,
			hasClouds: false,
			rings:false, // TODO: could be [angle,radius,opacity]
			//imageVar: planet128x128,
			craters: 0.3, // the opacity of the craters overlay
			ice: 0.8,
		},
		{
			name:"asterioid7",
			description:"",
			orbitIdx: 2,
			startingStepIdx: 8,
			color: '#3f3f3f',
			size: 1,
			ownedByPlayer: 0,
			hasClouds: false,
			rings:false, // TODO: could be [angle,radius,opacity]
			//imageVar: planet128x128,
			craters:1.0, // the opacity of the craters overlay
		},
		{
			name:"asterioid8",
			description:"",
			orbitIdx: 2,
			startingStepIdx: 12,
			color: '#3f3f3f',
			size: 1,
			ownedByPlayer: 0,
			hasClouds: false,
			rings:false, // TODO: could be [angle,radius,opacity]
			//imageVar: planet128x128,
			craters:1.0, // the opacity of the craters overlay
		},
    ],
};
