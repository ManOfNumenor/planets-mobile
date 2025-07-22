const UNIT_SQUARE_DEFAULT_SIZE = 18;
var selectedFleetAvailableMoves = [];

var allFleets = [
    {
        ships: 10,
        ownedByPlayer: 1,

        // should be at _either_ a planet
        // (& therefore moving with the planet)
        planetIdx: 3,

        // OR at an orbit & idx point
        // (& therefore not moving with planets)
        orbitIdx: null,
        stepIdx: null,
    },
    {
        ships: 10,
        ownedByPlayer: 2,
        planetIdx: 1,
        orbitIdx: null,
        stepIdx: null,
    }
];

function moveFleets() {
    // for(const fleet of allFleets) {
    //     let planet = planets[fleet.planetIdx];
    //     fleet.x = planet.x;
    //     fleet.y = planet.y;
    // }
}

function drawFleetSelectionOutline(x,y,w,h,whichSprite) {
    // colorCircle(x,y,w,whichSprite);
    let angleRad = performance.now()/600;
    let spriteScale = (scaleFactor / 2)*(1 / fleetSelectionOutlinePic.width + 1);
    drawBitmapCenteredWithRotationAndScale(fleetSelectionOutlinePic,x,y,angleRad,spriteScale);
}

function drawFleetIcon(x,y,w,h,whichSprite) {
    // colorRect(x,y,w,h,whichSprite);
    let angleRad = 0;
    let spriteScale = w*(1/fleetIconPic.width);
    drawBitmapCenteredWithRotationAndScale(fleetIconPic,x,y,angleRad,spriteScale);
}

function drawPlayerIcon(x,y,w,h,whichSprite) {
    // colorRect(x,y,w,h,whichSprite);
    let angleRad = 0;
    let spriteScale = w*(1/playerIconPic.width);
    drawBitmapCenteredWithRotationAndScale(playerIconPic,x,y,angleRad,spriteScale);
}

function drawFleets() {
    let drawWidth = UNIT_SQUARE_DEFAULT_SIZE * scaleFactor;
    const selectedCircleRadius = drawWidth + 3;

    for(const fleet of allFleets) {

        fleetStep = getFleetStep(fleet);

        let fleetX = fleetStep.x;
        let fleetY = fleetStep.y;

        let drawX = fleetX - (drawWidth / 2);
        let drawY = fleetY - (drawWidth / 2);

        if(selectedEntity && selectedEntity == fleet){
            drawFleetSelectionOutline(fleetX,fleetY);
        }
        drawFleetIcon(drawX,drawY,drawWidth,drawWidth,'yellow');

        // TODO: draw player icons instead of colored squares
        let iconOffset = 6 * scaleFactor;
        let iconWidth = 15 * scaleFactor;
        switch(fleet.ownedByPlayer) {
            case 1:
                drawPlayerIcon(drawX - iconOffset,drawY - iconOffset, 
                    iconWidth,iconWidth, 'red');                    
                break;
            case 2:
                drawPlayerIcon(drawX - (iconOffset / 2),
                    drawY - (iconOffset / 2), 
                    (iconWidth / 2 ) * 1.1 , '#00ff00');
                break;

        } // end switch

    } // end for

} // end function

function getFleetStep(fleet) {
    let fleetStep = null;
    if(fleet.planetIdx || fleet.planetIdx === 0) {
        // use planet coords
        let planet = planets[fleet.planetIdx];
        fleetStep = orbits[planet.orbitIdx].steps[planet.stepIdx];

    } else {
        // use fleet step coords
        fleetStep = orbits[fleet.orbitIdx].steps[fleet.stepIdx];

    }

    return fleetStep;
}

function getAvailableMoves(fleet) {
    if(!fleet || !fleet.hasOwnProperty('ships')) {
        // invalid fleet obj; abort.
        return [];
    }

    // TODO: calculate all possible destinations where 
    // the given fleet can move to this turn and return 
    // them in an array
    let availableMoves = [];

    let currentOrbitIdx = fleet.orbitIdx || (fleet.planetIdx !== null ? planets[fleet.planetIdx].orbitIdx : null);
    let currentStepIdx = fleet.stepIdx || (fleet.planetIdx !== null ? planets[fleet.planetIdx].stepIdx : null);
    
    if(currentOrbitIdx === null || currentStepIdx === null) {
        return [];
    }

    let currentOrbit = orbits[currentOrbitIdx];
    
    let clockwiseStepIdx = (currentStepIdx + 1) % currentOrbit.steps.length;
    availableMoves.push({
        orbitIdx: currentOrbitIdx,
        stepIdx: clockwiseStepIdx
    });
    
    let counterClockwiseStepIdx = currentStepIdx - 1;
    if(counterClockwiseStepIdx < 0) {
        counterClockwiseStepIdx = currentOrbit.steps.length - 1;
    }
    availableMoves.push({
        orbitIdx: currentOrbitIdx,
        stepIdx: counterClockwiseStepIdx
    });
    
    let connectionMovements = connections.filter(conn => {
        return (conn.innerOrbitIdx === currentOrbitIdx && conn.innerStepIdx === currentStepIdx) ||
               (conn.outerOrbitIdx === currentOrbitIdx && conn.outerStepIdx === currentStepIdx);
    });
    
    for(const conn of connectionMovements) {
        if(conn.innerOrbitIdx === currentOrbitIdx && conn.innerStepIdx === currentStepIdx) {
            availableMoves.push({
                orbitIdx: conn.outerOrbitIdx,
                stepIdx: conn.outerStepIdx,
            });
        } else {
            availableMoves.push({
                orbitIdx: conn.innerOrbitIdx,
                stepIdx: conn.innerStepIdx,
            });
        }
    }
    console.log('Fleet current position:', {orbitIdx: currentOrbitIdx, stepIdx: currentStepIdx});
    console.log('Available moves:', availableMoves);
    console.log('Connection moves found:', connectionMovements.length);
    connectionMovements.forEach((conn, index) => {
      console.log(`Connection ${index}:`, conn);
    });
    return availableMoves;
}

function selectedFleetCanMoveTo(target) {
    // TODO: crunch numbers & return a boolean;
    // probably involves checking against global
    // selectedFleetAvailableMoves var
      return selectedFleetAvailableMoves.some(move => 
        move.orbitIdx === target.orbitIdx && 
        move.stepIdx === target.stepIdx
    );
}
