var oculus = {
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
			rotation: Math.PI / 4,
		},
		{
			radius: 210,
			stepCount: 8,
			rotation: 0,
		},
		{
			radius: 320,
			stepCount: 16,
			rotation: 0, // Math.PI / 4,
		},
		{
			radius: 450,
			stepCount: 12,
			rotation: 0,
		},
		{
			radius: 600,
			stepCount: 6,
			rotation: Math.PI / 2,
		},
	],
	connections: [
		// coordinate format
		// [ innerOrbitIdx, innerStepIdx, outerOrbitIdx, outerStepIdx ],
		[0, 0, 1, 0],
		[0, 0, 1, 3],
		[0, 1, 1, 1],
		[0, 1, 1, 2],

		[1, 1, 2, 4],
		[1, 2, 2, 4],
		[1, 0, 2, 0],
		[1, 3, 2, 0],

		[2, 1, 3, 0],
		[2, 1, 3, 2],
		[2, 3, 3, 6],
		[2, 3, 3, 8],
		[2, 5, 3, 8],
		[2, 5, 3, 10],
		[2, 7, 3, 14],
		[2, 7, 3, 0],

		[3, 14, 4, 11],
		[3, 0, 4, 0],
		[3, 2, 4, 1],
		
		[3, 8, 4, 6],
		[3, 6, 4, 5],
		[3, 10, 4, 7],
		
		[3, 4, 4, 2],
		[3, 4, 4, 4],
		
		[3, 12, 4, 8],
		[3, 12, 4, 10],
		
		[4, 1, 5, 5],
		[4, 3, 5, 0],
		[4, 5, 5, 1],
		[4, 7, 5, 2],
		[4, 9, 5, 3],
		[4, 11, 5, 4],
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
			startingStepIdx: 9,
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
			orbitIdx: 4,
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

		// "asteroids"
		{
			name:"asterioid1",
			description:"",
			orbitIdx: 5,
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
			orbitIdx: 5,
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
			orbitIdx: 5,
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
			orbitIdx: 5,
			startingStepIdx: 15,
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
			orbitIdx: 5,
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
			orbitIdx: 5,
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
		{
			name:"asterioid6",
			description:"",
			orbitIdx: 5,
			startingStepIdx: 39,
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
			orbitIdx: 5,
			startingStepIdx: 47,
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
			orbitIdx: 5,
			startingStepIdx: 55,
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
