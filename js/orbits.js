const STEP_INDICATOR_RADIUS = 5;
const ORBIT_DRAW_COLOR = "cyan";

var orbits = [
    {
        radius: 50,
        stepCount: 2,
        centerObj: sun,
        rotation: 0,
    },
    {
        radius: 80,
        stepCount: 4,
        centerObj: sun,
        rotation: Math.PI / 4,
    },
    {
        radius: 120,
        stepCount: 15,
        centerObj: sun,
        rotation: 0,
    },
];

function moveOrbits() {
    //
}

function drawOrbits() {
    for(const orbit of orbits) {
        // draw orbit
        let center = orbit.centerObj;
        if(center) {
            outlineCircle(center.x,center.y,
                orbit.radius * scaleFactor, 
                ORBIT_DRAW_COLOR);


            // draw steps
            let arcLength = (2 * Math.PI)/
                orbit.stepCount;
            // let gapLength = 0.1;

            for(let i=0;i<orbit.stepCount;i++) {
                let stepAng = (i * arcLength) + 
                    orbit.rotation; // -
                // (Math.PI/2);
                // subtract PI/2 to start at 'North'
                // instead of 'East'

                let drawCoords = distAngAndOriginToXY(
                    orbit.radius * scaleFactor,
                    stepAng,
                    center,
                );

                colorCircle(drawCoords.x,drawCoords.y,
                    STEP_INDICATOR_RADIUS * scaleFactor,
                    ORBIT_DRAW_COLOR);
            } // end for loop (steps)
        } // end if

    } // end for loop (orbits)

} // end function drawOrbits()
