var bowtie = {
	playerCount: 2,
	sun: {
		isBinaryStar: true,
		imageVar: sunDark,
		sunspotsEnabled: true,
		radius: 50,
	},
	orbits: [
		{
			radius: 320,
			stepCount: 32,
			rotation: 0,
			offset: {
				x: -400,
				y: 0,
			},
		},
		{
			radius: 320,
			stepCount: 32,
			rotation: 0,
			offset: {
				x: 400,
				y: 0,
			},
		},
		
		// Center ring
		{
			radius: 200,
			stepCount: 6,
			rotation: 'half',
		},
	],
	connections: [
		// coordinate format
		// [ innerOrbitIdx, innerStepIdx, outerOrbitIdx, outerStepIdx ],
		[0, 2, 1, 14],
		[0, 30, 1, 18],
		
		[0, 8, 2, 2],
		[0, 14, 2, 2],
		[0, 18, 2, 3],
		[0, 24, 2, 3],
		
		[1, 2, 2, 0],
		[1, 8, 2, 0],
		[1, 24, 2, 5],
		[1, 30, 2, 5],
	],

	planets: [
		// Left Ring
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
			orbitIdx: 0,
			startingStepIdx: 10,
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
			orbitIdx: 0,
			startingStepIdx: 14,
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
			orbitIdx: 0,
			startingStepIdx: 22,
			color: 'darkgreen',
			size: 2,
			ownedByPlayer: 1,
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
			orbitIdx: 0,
			startingStepIdx: 21,
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
			orbitIdx: 0,
			startingStepIdx: 24,
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
			orbitIdx: 0,
			startingStepIdx: 26,
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
		
		// Right Ring
		{
			name:"Koraxian Prime",
			description:"Super-heated lava planet.",
			orbitIdx: 1,
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
			name:"Asteroid",
			description:"A hunk of rock.",
			orbitIdx: 1,
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
			name:"Ganth II",
			description:"It's icy core creates huge storms.",
			orbitIdx: 1,
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
			orbitIdx: 1,
			startingStepIdx: 14,
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
			orbitIdx: 1,
			startingStepIdx: 15,
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
			startingStepIdx: 19,
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
			startingStepIdx: 22,
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
			name:"Vasturia",
			description:"A lush, dense, jungle-planet.",
			orbitIdx: 1,
			startingStepIdx: 26,
			color: 'brown',
			size: 3,
			ownedByPlayer: 0,
			hasClouds: true,
			cloudStretchScale:16,
			rings:true, // TODO: could be [angle,radius,opacity]
			ringAngle: 100, // degrees (0 = horizontal)
			//imageVar: planet128x128,
			polarIce:1.5, // albedo %
		},

		// "asteroids"
		{
			name:"Asteroid",
			description:"A hunk of rock.",
			orbitIdx: 2,
			startingStepIdx: 2,
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
			orbitIdx: 2,
			startingStepIdx: 5,
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
	],
};
