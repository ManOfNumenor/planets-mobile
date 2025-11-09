var hanaous = {
	playerCount: 4,
	sun: {
		isBinaryStar: false,
		imageVar: sunDark,
		sunspotsEnabled: true,
		radius: 50,
	},
	orbits: [
		{
			radius: 90,
			stepCount: 10,
			rotation: 'half',
			offset: {
				x: 0,
				y: 0,
			},
		},
		{
			radius: 200,
			stepCount: 24,
			rotation: 0,
			offset: {
				x: 0,
				y: 0,
			},
			is_retrograde: true,
		},
		{
			radius: 280,
			stepCount: 32,
			rotation: 'half',
			offset: {
				x: 0,
				y: 0,
			},
		},
		
		// Side
		{
			radius: 150,
			stepCount: 7,
			rotation: 0,
			offset: {
				x: -500,
				y: -200,
			},
		},
		{
			radius: 150,
			stepCount: 7,
			rotation: 'half',
			offset: {
				x: 500,
				y: 200,
			},
			is_retrograde: true,
		},
	],
	connections: [
		// coordinate format
		// [ innerOrbitIdx, innerStepIdx, outerOrbitIdx, outerStepIdx ],
		[0, 2, 1, 19],
		[1, 19, 2, 4],
		[1, 19, 2, 5],
		[2, 5, 4, 5],
		
		[1, 6, 1, 1],
		[1, 1, 2, 29],
		
		[1, 4, 2, 25],
		[1, 4, 2, 26],
		
		[1, 22, 2, 2],
		[1, 22, 2, 1],
		[1, 22, 2, 31],
		
		[1, 15, 2, 8],
		[1, 15, 2, 10],
		[1, 15, 2, 11],
		
		[1, 7, 2, 20],
		[1, 9, 2, 18],
		[1, 10, 2, 18],
		
		[2, 30, 4, 2],
		
		[1, 12, 2, 16],
		[1, 13, 2, 13],
		[0, 5, 1, 13],
		
		[2, 21, 3, 6],
		[1, 7, 2, 21],
		[0, 7, 1, 7],
		
		
		[3, 1, 3, 5],
		[4, 2, 4, 5],
		
		[2, 14, 3, 1],
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
			orbitIdx: 0,
			startingStepIdx: 7,
			color: 'lime',
			size:1,
			ownedByPlayer: 0,
			hasClouds: true,
			atmosphereColor: 'rgba(0, 255, 255, 0.5)',
			//imageVar: planet32x32,
			ice:0.6, // alpha of ice overlay, 0 is default none
			polarIce:1.0, // very distinct ice poles
		},
		{
			name:"Asteroid",
			description:"A hunk of rock.",
			orbitIdx: 0,
			startingStepIdx: 9,
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
			description:"A hunk of rock.",
			orbitIdx: 1,
			startingStepIdx: 3,
			color: '#FFFFFF',
			size: 1,
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
			orbitIdx: 1,
			startingStepIdx: 6,
			color: 'grey',
			size: 3,
			ownedByPlayer: 0,
			hasClouds: false,
			//imageVar: planet64x64
			craters:1.0, // the opacity of the craters overlay
		},
		{
			name:"Vasturia",
			description:"A lush, dense, jungle-planet.",
			orbitIdx: 1,
			startingStepIdx: 11,
			color: 'darkgreen',
			size: 2,
			ownedByPlayer: 0,
			hasClouds: true,
			cloudStretchScale:16,
			rings:true, // TODO: could be [angle,radius,opacity]
			ringAngle: -30, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:1.0, // albedo %
		},
		{
			name:"Asteroid",
			description:"A hunk of rock.",
			orbitIdx: 1,
			startingStepIdx: 20,
			color: '#FFFFFF',
			size: 1,
			ownedByPlayer: 0,
			hasClouds: false,
			cloudStretchScale:16,
			rings: false,
			ringAngle: -8, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:1.0, // albedo %
		},
		{
			name:"Vasturia",
			description:"A lush, dense, jungle-planet.",
			orbitIdx: 1,
			startingStepIdx: 23,
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
			name:"Koraxian Prime",
			description:"Super-heated lava planet.",
			orbitIdx: 2,
			startingStepIdx: 1,
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
			orbitIdx: 2,
			startingStepIdx: 8,
			color: '#ff00ff',
			size:2,
			ownedByPlayer: 2,
			hasClouds: true,
			cloudStretchScale: 10, // >1 for long jupiter style clouds
			atmosphereColor: 'rgba(0, 255, 0, 0.5)',
			// imageVar: planet24x24,
		},
		{
			name:"Asteroid",
			description:"A hunk of rock.",
			orbitIdx: 2,
			startingStepIdx: 14,
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
			name:"Ganth II",
			description:"It's icy core creates huge storms.",
			orbitIdx: 2,
			startingStepIdx: 20,
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
			name:"Derelictus",
			description:"A wasteland of ancient craters.",
			orbitIdx: 2,
			startingStepIdx: 29,
			color: 'grey',
			size: 3,
			ownedByPlayer: 0,
			hasClouds: false,
			//imageVar: planet64x64
			craters:1.0, // the opacity of the craters overlay
		},
		{
			name:"Asteroid",
			description:"A hunk of rock.",
			orbitIdx: 2,
			startingStepIdx: 30,
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
			description:"A hunk of rock.",
			orbitIdx: 3,
			startingStepIdx: 0,
			color: '#FFFFFF',
			size: 1,
			ownedByPlayer: 0,
			hasClouds: false,
			cloudStretchScale:16,
			rings: false,
			ringAngle: -8, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:1.0, // albedo %
		},
		{
			name:"Vasturia",
			description:"A lush, dense, jungle-planet.",
			orbitIdx: 3,
			startingStepIdx: 3,
			color: 'darkgreen',
			size: 2,
			ownedByPlayer: 3,
			hasClouds: true,
			cloudStretchScale:16,
			rings:false, // TODO: could be [angle,radius,opacity]
			ringAngle: 0, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:1.0, // albedo %
		},
		{
			name:"Vasturia",
			description:"A lush, dense, jungle-planet.",
			orbitIdx: 3,
			startingStepIdx: 4,
			color: 'brown',
			size: 2,
			ownedByPlayer: 0,
			hasClouds: true,
			cloudStretchScale:16,
			rings:true, // TODO: could be [angle,radius,opacity]
			ringAngle: 100, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:1.5, // albedo %
		},

		
		{
			name:"Asteroid",
			description:"A hunk of rock.",
			orbitIdx: 4,
			startingStepIdx: 1,
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
			description:"A hunk of rock.",
			orbitIdx: 4,
			startingStepIdx: 3,
			color: '#FFFFFF',
			size: 2,
			ownedByPlayer: 0,
			hasClouds: false,
			cloudStretchScale:16,
			rings: false,
			ringAngle: -8, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:1.0, // albedo %
		},
		{
			name:"Assimile",
			description:"A cold, calm planet.",
			orbitIdx: 4,
			startingStepIdx: 4,
			color: '#c0c0c0',
			size: 2,
			ownedByPlayer: 4,
			hasClouds: false,
			cloudStretchScale:16,
			rings: true,
			ringAngle: 70, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:1.0, // albedo %
		},
	],
};
