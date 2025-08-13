const CLOUD_LAYER_ENABLED = true;
const CLOUD_SCALE = 80; // how many pixels from src image are resized to fit planet - smaller numbers mean bigger (but blurrier at high zoom) clouds
const CLOUD_OPACITY = 1; // less than one for fainter clouds (note: image has alpha too)

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

        if(planet.atmosphereColor) {
            drawAtmoHaze(step.x, step.y, planet);
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
            let cloudSpeed = 10; // fixme make a planet property
            drawCloudLayer(step.x,step.y,planet.radius*scaleFactor,cloudSpeed,planet.cloudStretchScale);
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
                    // a red rectangle below the planet
                    //colorRect(step.x - (iconWidth / 2),
                    //    step.y + iconOffset, 
                    //    iconWidth,iconWidth, 'red');
                    // a red dotted circle around planet
                    drawBitmapCenteredWithRotationAndScale(ownedByPlayer1Pic,
                        Math.round(step.x),Math.round(step.y),0,planet.radius*scaleFactor*2.75/ownedByPlayer2Pic.width);
                    break;
                
                case 2:
                    //colorCircle(step.x, step.y + iconOffset, 
                    //    (iconWidth / 2 ) * 1.1 , '#00ff00');
                    // a green dashed circle around planet
                    drawBitmapCenteredWithRotationAndScale(ownedByPlayer2Pic,
                        Math.round(step.x),Math.round(step.y),0,planet.radius*scaleFactor*2.75/ownedByPlayer2Pic.width);
                    break;
            } // end switch
        } // end if

        if(selectedFleetCanMoveTo({ 
                orbitIdx: planet.orbitIdx, 
                stepIdx: planet.stepIdx
            })) {

            drawCanMoveHereIndicator(step);
        }

        // display a tooltip with planet info
        maybeDrawTooltip(planet,step);

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

function drawCloudLayer(x,y,radius,speed=10,stretch=1) {
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

    canvasContext.globalAlpha = CLOUD_OPACITY;
    canvasContext.drawImage(cloudPic,dx,dy,CLOUD_SCALE*(1/stretch),CLOUD_SCALE,x-w/2,y-h/2,w,h);
    
    canvasContext.restore();
}

function drawAtmoHaze(x,y, planet) {
    //console.log('drawAtmoHaze');
    const ATMO_RADIUS_FACTOR = 1.3;

    let innerRadius = planet.radius * scaleFactor;
    let outerRadius = planet.radius * ATMO_RADIUS_FACTOR * scaleFactor;

    //console.log('innerRadius', innerRadius, 'outerRadius', outerRadius);
    //console.log(x, y, planet.radius, planet.radius * ATMO_RADIUS_FACTOR);
    let atmoGradient = canvasContext.createRadialGradient(
        x,y, innerRadius,
        x,y, outerRadius
    );

    atmoGradient.addColorStop(0,
        planet.atmosphereColor);
    atmoGradient.addColorStop(0.4,
        planet.atmosphereColor);
    atmoGradient.addColorStop(1,
        'transparent');

    canvasContext.fillStyle = atmoGradient;
    canvasContext.fillRect(x - 100, y - 100, 200, 200);
    /*
    canvasContext.beginPath();
    canvasContext.arc(x,y,
        outerRadius * 2,
        0, Math.PI*2, true);
    canvasContext.fill();
    */
}

// draws and fades some planetary info
// based on proxmity to the pointer (mouse/touch)
var hoveringXY = {x:999999999,y:999999999};

function updateTooltips(x,y) {
    hoveringXY.x = x;
    hoveringXY.y = y;
}

function maybeDrawTooltip(planet,thisXY) {
        const CLOSE_ENOUGH = planet.radius; // only if the pointer is nearby
        if (distBetween(hoveringXY,thisXY)<=CLOSE_ENOUGH) {
            //console.log("hovering this planet: "+planet.name);
            let line1 = "Planet Name: "+planet.name;
            let line2 = planet.description;
            let line3 = "Unclaimed by any player";
            if (planet.ownedByPlayer) line3 = "Owned by player "+planet.ownedByPlayer;
            drawPlanetTooltip(line1,line2,line3,thisXY.x,thisXY.y-planet.radius-36);
        }
}

function drawPlanetTooltip(line1,line2,line3,textX,textY) {
    const ofsX = 75-12;
    const pad = 12;
    const boxW = 150;
    const boxH = 44;
    // tooltip box
    canvasContext.fillStyle = "white";
    canvasContext.globalAlpha = 0.1;
    canvasContext.fillRect(textX-pad-ofsX,textY-pad,boxW,boxH);
    canvasContext.globalAlpha = 1;
    outlineRect(textX-pad-ofsX,textY-pad,boxW,boxH,"rgba(255,255,255,0.4);");
    // tooltip text
    canvasContext.textAlign = "center";
    canvasContext.fillStyle = "black";
    canvasContext.fillText(line1,textX+1,textY+1);
    canvasContext.fillStyle = "white";
    canvasContext.fillText(line1,textX,textY);
    canvasContext.fillStyle = "silver";
    canvasContext.fillText(line2,textX,textY+12);
    canvasContext.fillStyle = "brown";
    canvasContext.fillText(line3,textX,textY+24);
}
