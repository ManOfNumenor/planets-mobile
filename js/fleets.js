const UNIT_SQUARE_DEFAULT_SIZE = 18;
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
    let spriteScale = w*(1/fleetSelectionOutlinePic.width);
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
