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
            stepCount: 15,
            rotation: 0,
        },
    ],
    connections: [
        { 
            innerOrbitIdx: 0, 
            innerStepIdx: 0,
            outerOrbitIdx: 1, 
            outerStepIdx: 0,
        },
        { 
            innerOrbitIdx: 0, 
            innerStepIdx: 0,
            outerOrbitIdx: 1, 
            outerStepIdx: 3,
        },
        { 
            innerOrbitIdx: 1, 
            innerStepIdx: 3,
            outerOrbitIdx: 2, 
            outerStepIdx: 13,
        },
    ],
    planets: [
        {
            orbitIdx: 0,
            startingStepIdx: 0,
            color: 'red',
            radius: 10,
        },
        {
            orbitIdx: 1,
            startingStepIdx: 0,
            color: '#ff00ff',
            radius: 14,
        },
        {
            orbitIdx: 2,
            startingStepIdx: 1,
            color: 'lime',
            radius: 20,
        },
    ],
};
