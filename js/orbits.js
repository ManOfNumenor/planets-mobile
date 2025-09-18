// blue lines between available fleet moves:
const DRAW_ROUTE_LINES = true; 
const ROUTE_LINES_RGBA = "rgba(0,255,255,0.15)";
const ROUTE_LINES_WIDTH = 16;

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

    // a spinning green triangle pin to help draw the eye
    let wobble = Math.cos(performance.now()/222) * 8;
    canvasContext.drawImage(canMoveHerePic,
        0,0,canMoveHerePic.width,canMoveHerePic.height,
        step.x-4-wobble/2,step.y-12-((STEP_INDICATOR_RADIUS + 3) * scaleFactor),
        8+wobble, 8);

    // draw a line from the fleet to this target
    if (DRAW_ROUTE_LINES && currentlySelectedFleet) {
        let fleetStep = getFleetStep(currentlySelectedFleet);
        let fromX = fleetStep.x;
        let fromY = fleetStep.y;
        let toX = step.x;
        let toY = step.y;
        //console.log("route lines! from "+fromX+","+fromY+" to "+toX+","+toY);
        canvasContext.save();
        canvasContext.beginPath();
        canvasContext.moveTo(fromX, fromY);
        canvasContext.lineTo(toX, toY);
        canvasContext.lineWidth = ROUTE_LINES_WIDTH;
        canvasContext.strokeStyle = ROUTE_LINES_RGBA;
        canvasContext.stroke();
        canvasContext.restore();
    }

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

// used in drawPlanets() to tween from turn to turn using a curve
function getOrbitTweenPos(planet,step,sun) {
    // put planet at target if it has never moved before
    if (planet.animationX==undefined) planet.animationX = step.x;
    if (planet.animationY==undefined) planet.animationY = step.y;
    // where are we NOW? (distBetween needs an object with this shape)
    let start = { x:planet.animationX, y:planet.animationY };
    // measure distance and angle to the sun
    let orbit = orbits[planet.orbitIdx];
    let sundist = orbit.radius * scaleFactor; //distBetween(start,sun);
    let currentAngle = Math.atan2(start.y-sun.y,start.x-sun.x);
    // determine target angle from sun
    let targetAngle = Math.atan2(step.y-sun.y,step.x-sun.x);
    let angleDifference = Math.abs(currentAngle - targetAngle);
    // stay put when close enough to avoid float imprecision infinite drift
    if (angleDifference < 0.005) return { x:step.x, y:step.y };
    // make sure we go "the short way around"
    if (currentAngle > targetAngle) currentAngle -= 360*DEG_TO_RAD;
    // step (lerp) the angle from current to target
    let newAngle = lerp(currentAngle,targetAngle,PLANET_ANIM_SPEED);
    //console.log("dist:"+sundist.toFixed(1)+" angle:"+currentAngle.toFixed(1));
    // generate new coordinates using new angle and prev sun dist
    let newX = sun.x + (Math.cos(newAngle) * sundist);
    let newY = sun.y + (Math.sin(newAngle) * sundist);
    //console.log("orbiting result:"+newX.toFixed(1)+","+newY.toFixed(1));
    return { x:newX, y:newY };
}

