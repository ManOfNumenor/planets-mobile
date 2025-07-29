const STEP_INDICATOR_RADIUS = 5;
//const ORBIT_DRAW_COLOR = "cyan";
const ORBIT_DRAW_COLOR = "#c0c0c0";

var orbits = [];

var connections = [];

function moveOrbits() {
    for(const orbit of orbits) {
        let arcLength = (2 * Math.PI)/
            orbit.steps.length;

        for(let i=0;i<orbit.steps.length;i++) {
            let step = orbit.steps[i];

            let stepAng = (i * arcLength) + 
                orbit.rotation; 
            // - (Math.PI/2);
            // subtract PI/2 to start at 'North'
            // instead of 'East'

            let newCoords = distAngAndOriginToXY(
                orbit.radius * scaleFactor,
                stepAng,
                sun,
            );

            step.x = newCoords.x;
            step.y = newCoords.y;

        } // end for i

    } // end for orbit
} // end function moveOrbits()

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
                orbit.steps.length;
            // let gapLength = 0.1;

            //for(const step of orbit.steps) {
            for(let i=0;i<orbit.steps.length;i++) {
                let step = orbit.steps[i];
                // let stepAng = (i * arcLength) + 
                //     orbit.rotation; 
                // // - (Math.PI/2);
                // // subtract PI/2 to start at 'North'
                // // instead of 'East'


                // let drawCoords = distAngAndOriginToXY(
                //     orbit.radius * scaleFactor,
                //     stepAng,
                //     center,
                // );

                colorCircle(step.x,step.y,
                    STEP_INDICATOR_RADIUS * scaleFactor,
                    ORBIT_DRAW_COLOR);
                
                if(selectedFleetCanMoveTo({ orbitIdx: orbitIdx, stepIdx: i})) {
                    drawCanMoveHereIndicator(step);
                }

                if(gameOptions.showOrbitDebugInfo) {
                    const labelOffset = 
                        STEP_INDICATOR_RADIUS + 5;

                    colorText(
                        orbitIdx+'~'+i,
                        step.x + labelOffset,
                        step.y + labelOffset,
                        '#00ff00'
                    );
                }

                // check for connections at this stop
                // & update coords since we have them

                // updateConnectionLines(orbitIdx,
                //     i, drawCoords);

            } // end for loop (steps)
        } // end if

        orbitIdx++;

    } // end for loop (orbits)

    // now that we've updated line end coords,
    // lets draw the connection lines
    if(orbits.length > 1) {
        for(const conn of connections) {
            // console.log('innerOrbit', orbits[conn.innerOrbitIdx], conn, conn.innerOrbitIdx);
            let innerStep = orbits[conn.innerOrbitIdx]
                .steps[conn.innerStepIdx];
            let outerStep = orbits[conn.outerOrbitIdx]
                .steps[conn.outerStepIdx];

            if(innerStep && outerStep) {
                colorLine(
                    innerStep.x, innerStep.y,
                    outerStep.x, outerStep.y,
                    ORBIT_DRAW_COLOR
                );
            }
        } // end for 
    } // end if


} // end function drawOrbits()

function drawCanMoveHereIndicator(step) {
    // extracted to function because it's called from 
    // both drawOrbits() & drawPlanets()
    colorCircle(step.x,step.y,
        (STEP_INDICATOR_RADIUS + 3) * scaleFactor,
        'yellow');
}
/*
function updateConnectionLines(orbitIdx, stepIdx, drawCoords) {
    // console.log('updateConnectionLines', orbitIdx, stepIdx, drawCoords);
    // goes in new func
    let outwardConnectionLines =
        connections.filter((conn) => {
            return conn.innerOrbitIdx == orbitIdx &&
                conn.innerStepIdx == stepIdx;
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
                conn.outerStepIdx == stepIdx;
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
*/

// function getCurrentStepAng(planet) {
//     let orbit = orbits[planet.orbitIdx];
// 
//     let planetArcLength = (2 * Math.PI)/
//         orbit.stepCount;
//     let currentStepNumber = turnNumber % 
//         orbit.stepCount;
//     let currentStepAng = (currentStepNumber *
//         planetArcLength) + orbit.rotation; 
//     // - (Math.PI/2);
//     // subtract PI/2 to start at 'North'
//     // instead of 'East'
// 
//     return currentStepAng;
// }
