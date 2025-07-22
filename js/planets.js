const CLOUD_LAYER_ENABLED = true;

var planets = [];

function movePlanets() {
    //
}

function drawPlanets() {
    if(!orbits || orbits.length < 1) {
        return; // no orbits, don't draw planets
    }

    // draw sun
    drawSun();

    for(const planet of planets) {
        let step = orbits[planet.orbitIdx].steps[planet.stepIdx];

        if(logThisRound) {
            //
        }

        // planets are no longer selectable, but 
        // leaving this here just in case that 
        // changes later on
        // let selectedPlanetHighlightRadius = 5;
        // if(selectedEntity == planet) {
        //     colorCircle(planet.x,
        //         planet.y,
        //         (planet.radius + selectedPlanetHighlightRadius) *
        //         scaleFactor, 
        //         'cyan');
        // }

        if (planet.rings) {
            drawBitmapCenteredWithRotationAndScale(ringsBackPic,
                Math.round(step.x),Math.round(step.y),0,scaleFactor/3);
        }

        if(planet.imageVar) {
            drawBitmapCenteredWithRotationAndScale(
                planet.imageVar, 
                step.x, step.y, 
                0,
                scaleFactor
            );
        } else {
            colorCircle(step.x, step.y,
                planet.radius * scaleFactor, planet.color);
        }

        if (planet.hasClouds) {
            drawCloudLayer(step.x,step.y,planet.radius*scaleFactor,10);
        }

        // draw planet shadow
        shadeCircle(step.x, step.y,
                planet.radius * scaleFactor);

        if (planet.rings) {
            drawBitmapCenteredWithRotationAndScale(ringsFrontPic,
            Math.round(step.x),Math.round(step.y),0,scaleFactor/3);
        }

        if (MOONS_ENABLED) drawAllMoons(planet.moons,step.x,step.y);

        // TODO: draw player icons instead of colored squares
        let iconOffset = 30 * scaleFactor;
        let iconWidth = 18 * scaleFactor;

        if(planet.ownedByPlayer) {
            switch(planet.ownedByPlayer) {
                case 1:
                    colorRect(step.x - (iconWidth / 2),
                        step.y + iconOffset, 
                        iconWidth,iconWidth, 'red');
                    break;
                case 2:
                    colorCircle(step.x, step.y + iconOffset, 
                        (iconWidth / 2 ) * 1.1 , '#00ff00');
                    break;
            } // end switch
        } // end if

    } // end for

    logThisRound = false;

}


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

function drawCloudLayer(x,y,radius,speed) {
    if (!CLOUD_LAYER_ENABLED) return;
    canvasContext.save(); 
    
    // create a circular "clipping" path
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, Math.PI*2, true);
    canvasContext.clip(); // now whatever we draw has to be inside the path

    // scroll through a seamless cloud panorama
    let dx = (performance.now()/1000*speed) % cloudPic.width;
    let dy = 0;
    let w = radius*2;
    let h = radius*2;
    canvasContext.drawImage(cloudPic,dx,dy,w,h,x-w/2,y-h/2,w,h);
    
    canvasContext.restore();
}
