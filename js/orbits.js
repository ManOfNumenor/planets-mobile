const STEP_INDICATOR_RADIUS = 5;
const ORBIT_DRAW_COLOR = "cyan";

var orbits = [
    {
        radius: 50,
        stepCount: 2,
        centerObj: sun,
    },
    {
        radius: 80,
        stepCount: 3,
        centerObj: sun,
    },
    {
        radius: 120,
        stepCount: 15,
        centerObj: sun,
    },
];

function moveOrbits() {
    //
}

function drawOrbits() {
    for(const orbit of orbits) {
        // draw orbit
        let center = orbit.centerObj;
        outlineCircle(center.x,center.y,
            orbit.radius, ORBIT_DRAW_COLOR);


        // draw steps
        let arcLength = (2 * Math.PI)/
            orbit.stepCount;
        // let gapLength = 0.1;

        for(let i=0;i<planet.orbitSteps;i++) {
            let stepAng = (i * arcLength); // -
                // (Math.PI/2);
            // subtract PI/2 to start at 'North'
            // instead of 'East'

            let drawCoords = distAngAndOriginToXY(
                orbit.radius,
                stepAng,
                center,
            );

            colorCircle(drawCoords.x,drawCoords.y,
                STEP_INDICATOR_RADIUS,
                ORBIT_DRAW_COLOR);
        } // end for loop (steps)

    } // end for loop (orbits)

} // end function drawOrbits()
