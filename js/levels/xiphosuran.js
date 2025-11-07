var xiphosuran = {
	playerCount: 3,
	//randomize_on_load: true,
	sun: {
		isBinaryStar: true,
		imageVar: sunWhiteDwarf,
		sunspotsEnabled: false,
		radius: 80,
	},
	orbits: [
		{
			radius: 107,
			stepCount: 4,
			rotation: 0,
		},
		{
			radius: 150,
			stepCount: 8,
			rotation: 0,
		},
		{
			radius: 325,
			stepCount: 3,
			rotation: 0, //Math.PI / 4,
		},
		{
			radius: 400,
			stepCount: 6,
			rotation: Math.PI / 6,
		},
		{
			radius: 475,
			stepCount: 12,
			rotation: 0, //Math.PI / 4,
		},
		{
			radius: 635,
			stepCount: 12,
			rotation: 0,
		},
		{
			radius: 755,
			stepCount: 8,
			rotation: 0, //Math.PI / 4,
		},
	],
	connections: [
		// coordinate format
		// [ innerOrbitIdx, innerStepIdx, outerOrbitIdx, outerStepIdx ],
		[0, 0, 1, 0],
		[1, 0, 2, 0],
		
		//[0, 1, 1, 1],
		[0, 1, 1, 3],
		[0, 2, 1, 3],
		[0, 2, 1, 5],
		[0, 3, 1, 5],
		//[0, 3, 1, 7],
		
		[1, 3, 6, 3],
		[1, 5, 6, 5],
		
		[2, 1, 3, 1],
		[2, 1, 3, 2],
		[2, 2, 3, 3],
		[2, 2, 3, 4],
		
		[3, 1, 4, 2],
		[3, 2, 4, 6],
		[3, 3, 4, 6],
		[3, 4, 4, 10],
		
		//[5, 0, 6, 0],
		[4, 2, 5, 1],
		[4, 3, 5, 2],
		[4, 4, 5, 3],
		[4, 6, 5, 6],
		[4, 8, 5, 9],
		[4, 9, 5, 10],
		[4, 10, 5, 11],
		
		[5, 11, 6, 0],
		[5, 1, 6, 0],
		[5, 5, 6, 4],
		[5, 7, 6, 4],
		
	],

	planets: [
		{
			name:"Koraxian Prime",
			description:"Super-heated lava planet.",
			orbitIdx: 0,
			startingStepIdx: 0,
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
			orbitIdx: 1,
			startingStepIdx: 2,
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
			startingStepIdx: 6,
			color: 'lime',
			size:2,
			ownedByPlayer: 0,
			hasClouds: true,
			atmosphereColor: 'rgba(0, 255, 255, 0.5)',
			//imageVar: planet32x32,
			ice:0.6, // alpha of ice overlay, 0 is default none
			polarIce:1.0, // very distinct ice poles
		},
		
		{
			name:"Asteroid",
			description:"A lush, dense, jungle-planet.",
			orbitIdx: 2,
			startingStepIdx: 1,
			color: '#FFFFFF',
			size: 2,
			ownedByPlayer: 0,
			hasClouds: false,
			cloudStretchScale:1,
			rings: true,
			ringAngle: -80, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:0.5, // albedo %
		},
		
		{
			name:"Asteroid",
			description:"A lush, dense, jungle-planet.",
			orbitIdx: 3,
			startingStepIdx: 2,
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
			orbitIdx: 3,
			startingStepIdx: 4,
			color: '#FFFFFF',
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
			orbitIdx: 3,
			startingStepIdx: 5,
			color: '#FFFFFF',
			size: 1.5,
			ownedByPlayer: 0,
			hasClouds: false,
			cloudStretchScale:16,
			rings: false,
			ringAngle: -8, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:1.0, // albedo %
		},
		
		{
			name:"Derelictus",
			description:"A wasteland of ancient craters.",
			orbitIdx: 4,
			startingStepIdx: 0,
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
			orbitIdx: 4,
			startingStepIdx: 4,
			color: 'darkgreen',
			size: 2,
			ownedByPlayer: 0,
			hasClouds: true,
			cloudStretchScale:16,
			rings:false, // TODO: could be [angle,radius,opacity]
			ringAngle: -30, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:1.0, // albedo %
		},
		{
			name:"Vasturia II",
			description:"A lush, dense, jungle-planet.",
			orbitIdx: 4,
			startingStepIdx: 7,
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
			name:"Derelictus",
			description:"A wasteland of ancient craters.",
			orbitIdx: 5,
			startingStepIdx: 1,
			color: 'grey',
			size: 2,
			ownedByPlayer: 0,
			hasClouds: false,
			//imageVar: planet64x64
			craters:1.0, // the opacity of the craters overlay
		},
		{
			name:"Vasturia III",
			description:"A lush, dense, jungle-planet.",
			orbitIdx: 5,
			startingStepIdx: 5,
			color: 'darkgreen',
			size: 1,
			ownedByPlayer: 0,
			hasClouds: true,
			cloudStretchScale:16,
			rings:true, // TODO: could be [angle,radius,opacity]
			ringAngle: 0, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:1.0, // albedo %
		},
		{
			name:"Vasturia IV",
			description:"A lush, dense, jungle-planet.",
			orbitIdx: 5,
			startingStepIdx: 8,
			color: 'brown',
			size: 1,
			ownedByPlayer: 3,
			hasClouds: true,
			cloudStretchScale:16,
			rings:false, // TODO: could be [angle,radius,opacity]
			ringAngle: 30, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:1.5, // albedo %
		},
		{
			name:"Vasturia V",
			description:"A lush, dense, jungle-planet.",
			orbitIdx: 5,
			startingStepIdx: 11,
			color: 'brown',
			size: 1,
			ownedByPlayer: 0,
			hasClouds: true,
			cloudStretchScale:16,
			rings:false, // TODO: could be [angle,radius,opacity]
			ringAngle: 30, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:1.5, // albedo %
		},
		
		{
			name:"Geragantis",
			description:"An enormous, cold gas giant.",
			orbitIdx: 6,
			startingStepIdx: 6,
			color: 'blue',
			size: 3,
			ownedByPlayer: 0,
			hasClouds: true,
			cloudStretchScale:8,
			rings:true, // TODO: could be [angle,radius,opacity]
			ringAngle: 90, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:20.0, // albedo %
		},
	],
};
