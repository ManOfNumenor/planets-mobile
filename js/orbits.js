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

var connections = [
    { 
        innerOrbitIdx: 0, 
        innerOrbitStep: 0,
        innerOrbitX: null, 
        innerOrbitY: null,
        outerOrbitIdx: 1, 
        outerOrbitStep: 0,
        outerOrbitX: null, 
        outerOrbitY: null,
    },
    { 
        innerOrbitIdx: 0, 
        innerOrbitStep: 0,
        innerOrbitX: null, 
        innerOrbitY: null,
        outerOrbitIdx: 1, 
        outerOrbitStep: 3,
        outerOrbitX: null, 
        outerOrbitY: null,
    },
    { 
        innerOrbitIdx: 1, 
        innerOrbitStep: 3,
        innerOrbitX: null, 
        innerOrbitY: null,
        outerOrbitIdx: 2, 
        outerOrbitStep: 0,
        outerOrbitX: null, 
        outerOrbitY: null,
    },
];
function moveOrbits() {
    //
}

function drawOrbits() {
    let orbitIdx = 0;
    while(orbitIdx < orbits.length) {
        let orbit = orbits[orbitIdx];
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
                    orbit.rotation; 
                // - (Math.PI/2);
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

                if(gameOptions.showOrbitDebugInfo) {
                    const labelOffset = 
                        STEP_INDICATOR_RADIUS + 5;

                    colorText(
                        orbitIdx+'~'+i,
                        drawCoords.x + labelOffset,
                        drawCoords.y + labelOffset,
                        '#00ff00'
                    );
                }

                // check for connections at this stop
                // & update coords since we have them
                updateConnectionLines(orbitIdx,
                    i, drawCoords);

            } // end for loop (steps)
        } // end if

        orbitIdx++;

    } // end for loop (orbits)

    // now that we've updated line end coords,
    // lets draw the connection lines
    for(const conn of connections) {
        colorLine(
            conn.innerOrbitX, conn.innerOrbitY,
            conn.outerOrbitX, conn.outerOrbitY,
            ORBIT_DRAW_COLOR
        );
    }


} // end function drawOrbits()

function updateConnectionLines(orbitIdx, stepIdx, drawCoords) {
    // console.log('updateConnectionLines', orbitIdx, stepIdx, drawCoords);
    // goes in new func
    let outwardConnectionLines =
        connections.filter((conn) => {
            return conn.innerOrbitIdx == orbitIdx &&
                conn.innerOrbitStep == stepIdx;
        });

    // console.log('outwardConnectionLines', outwardConnectionLines);

    if(outwardConnectionLines.length > 0) {
        for(let conn of outwardConnectionLines) {
            conn.innerOrbitX = drawCoords.x;
            conn.innerOrbitY = drawCoords.y;
        }
    }

    let inwardConnectionLines =
        connections.filter((conn) => {
            return conn.outerOrbitIdx == orbitIdx &&
                conn.outerOrbitStep == stepIdx;
        });

    // console.log('inwardConnectionLines', inwardConnectionLines);

    if(inwardConnectionLines.length > 0) {
        for(let conn of inwardConnectionLines) {
            conn.outerOrbitX = drawCoords.x;
            conn.outerOrbitY = drawCoords.y;
        }
    }
    // console.log('done');
}
