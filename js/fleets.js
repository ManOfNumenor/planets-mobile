const UNIT_SQUARE_DEFAULT_SIZE = 18;
const SHIP_PRODUCTION_FACTOR = 1;

// like on google maps, where pin icons don't change size as you zoom
// if set to 0, icons will scale with game zoom
const FLEET_ICON_CONSTANT_SIZE = 42; 
const PLAYER_ICON_CONSTANT_SIZE = 32; 

var selectedFleetAvailableMoves = [];

var allFleets = [
    /*
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
        movedThisTurn: false,
    },
    {
        ships: 10,
        ownedByPlayer: 2,
        planetIdx: 1,
        orbitIdx: null,
        stepIdx: null,
        movedThisTurn: false,
    }
    */
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
    if (FLEET_ICON_CONSTANT_SIZE) spriteScale = FLEET_ICON_CONSTANT_SIZE*(1/fleetIconPic.width);
    drawBitmapCenteredWithRotationAndScale(fleetIconPic,x,y,angleRad,spriteScale);
}

function drawPlayerIcon(x,y,w,h,whichSprite=player1IconPic) {
    // colorRect(x,y,w,h,whichSprite);
    let angleRad = 0;
    let spriteScale = w*(1/whichSprite.width);
    if (PLAYER_ICON_CONSTANT_SIZE) spriteScale = PLAYER_ICON_CONSTANT_SIZE*(1/whichSprite.width);
    drawBitmapCenteredWithRotationAndScale(whichSprite,x,y,angleRad,spriteScale);
}

function drawFleets() {
    if(!allFleets || allFleets.length < 1) {
        return;
    }

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
                    iconWidth,iconWidth, player1IconPic);
                break;
            case 2:
                drawPlayerIcon(drawX - iconOffset,drawY - iconOffset, 
                    iconWidth,iconWidth, player2IconPic);
                break;
            case 3:
                drawPlayerIcon(drawX - iconOffset,drawY - iconOffset, 
                    iconWidth,iconWidth, player3IconPic);
                break;
            case 4:
                drawPlayerIcon(drawX - iconOffset,drawY - iconOffset, 
                    iconWidth,iconWidth, player4IconPic);
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

function moveFleetToTarget(fleet, target) {
    let foundPlanetIdx = planets.findIndex((planet) => {
        return planet.orbitIdx == target.orbitIdx &&
            planet.stepIdx == target.stepIdx;
    });

    if(foundPlanetIdx !== -1) {
        fleet.planetIdx = foundPlanetIdx;
        fleet.orbitIdx = null;
        fleet.stepIdx = null;
    } else {
        fleet.planetIdx = null;
        fleet.orbitIdx = target.orbitIdx;
        fleet.stepIdx = target.stepIdx;
    }

    let existingFleetAtStep = allFleets.find(foundFleet => {
        return ( 
            (foundFleet.stepIdx == target.stepIdx && foundFleet.orbitIdx == target.orbitIdx) ||
            (foundFleet.planetIdx == foundPlanetIdx)
        ) && foundFleet !== fleet;
    });

    if(existingFleetAtStep) {
        if(existingFleetAtStep.ownedByPlayer === fleet.ownedByPlayer) {
            // merge the two fleets
            existingFleetAtStep.ships += fleet.ships;

            // make sure dest fleet can't move again this turn,
            // otherwise a player can move a big fleet really far 
            // in one turn by just lining up a bunch of friendly
            // one-ship fleets it it's path.
            existingFleetAtStep.movedThisTurn = true; 

            // delete moved fleet
            allFleets = allFleets.filter(
                fleetToCheck => fleetToCheck !== fleet
            );
        } else {
            // initiate combat

            if(existingFleetAtStep.ships > fleet.ships) {
                // existing fleet (defender) wins

                // calculate winner casualties (avoiding zero-fleet ships)
                existingFleetAtStep.ships = Math.max(existingFleetAtStep.ships - fleet.ships, 1);

                // delete moved fleet
                allFleets = allFleets.filter(
                    fleetToCheck => fleetToCheck !== fleet
                );
            } else {
                // fleet (attacker) wins

                // calculate winner casualties (avoiding zero-fleet ships)
                fleet.ships = Math.max(fleet.ships - existingFleetAtStep.ships, 1);

                // delete existing fleet
                allFleets = allFleets.filter(
                    fleetToCheck => fleetToCheck !== existingFleetAtStep
                );

            } // end else (attacker wins)

        } // end else (initiate combat)

    } // end if(existingFleetAtStep)

    if(fleet && fleet.planetIdx !== null) {
        // we landed on a planet and we're still here, conquer it!
        let planet = planets[foundPlanetIdx];

        if(planet.ownedByPlayer !== fleet.ownedByPlayer) {
            planet.ownedByPlayer = fleet.ownedByPlayer;
        }

    } // end if(fleet && fleet.planetIdx)

} // end function

function movePlanetsAndProduceShips() {
    for(let i=0;i<planets.length;i++) {

        let planet = planets[i];
        let orbit = orbits[planet.orbitIdx];
        let finalStepIdx = orbit.steps.length - 1;

        if(planet.stepIdx < finalStepIdx) {
            planet.stepIdx++;
        } else {
            planet.stepIdx = 0;
        }

        if(planet.ownedByPlayer > 0) {
            let countShipsProduced = Math.floor(planet.size * SHIP_PRODUCTION_FACTOR);
            let fleetAtPlanet = allFleets.find(fleet => fleet.planetIdx === i);

            if(fleetAtPlanet && fleetAtPlanet.ownedByPlayer === planet.ownedByPlayer) {
                fleetAtPlanet.ships += countShipsProduced;
            } else {
                allFleets.push({
                    ships: countShipsProduced,
                    ownedByPlayer: planet.ownedByPlayer,
                    planetIdx: i,
                    orbitIdx: null,
                    stepIdx: null,
                });
            }
        }
    }
}

function setupFleetInfoDiv() {
    selectedFleetInfoDiv.innerHTML = `
    Player: ${selectedEntity.ownedByPlayer} Ships: ${selectedEntity.ships}
    `;
    // TODO: add fleet action buttons
    selectedFleetInfoDiv.style.display = 'flex';
}

function clearFleetInfoDiv() {
    selectedFleetInfoDiv.innerHTML = "";
    selectedFleetInfoDiv.style.display = 'none';
}
