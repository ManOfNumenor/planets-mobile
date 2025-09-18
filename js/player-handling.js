var currentPlayerNumber = 0;
var playerCount = 0;
var computerPlayerNumbers = [2];

function endTurn() {
    
    if (endTurnSound) endTurnSound.play();

    advancePlayerNumber();

    if(currentPlayerNumber === 0) {
        turnNumber++;
        movePlanetsAndProduceShips();

        for(const fleet of allFleets) {
            fleet.movedThisTurn = false;
        }

        advancePlayerNumber();
    }

    //window.alert(`player ${currentPlayerNumber}'s turn`);
    if(!computerPlayerNumbers.includes(currentPlayerNumber)) {
        alertDialog(`player ${currentPlayerNumber}'s turn`);
    } else {
        runComputerTurn();
    }

    // debug("turn "+turnNumber);
    // logThisRound = true;
}


function advancePlayerNumber() {
    currentPlayerNumber++;

    if(currentPlayerNumber > playerCount) {
        currentPlayerNumber = 0;
    }
}

async function runComputerTurn() {
    let playerFleets = allFleets.filter(
        fleet => fleet.ownedByPlayer === currentPlayerNumber
    );

    for(const fleet of playerFleets) {
        if(fleet.planetIdx || fleet.planetIdx === 0) {
            // check if the planet we are on is capture-able
            let planet = planets[fleet.planetIdx];

            if(planet && planet.ownedByPlayer !== fleet.ownedByPlayer) {
                let fleetIdx = allFleets.indexOf(fleet);
                capture_planet(fleetIdx);
                continue; // skip to next fleet
            }
        }

        let availableMoves = getAvailableMoves(fleet);

        if(availableMoves.length > 0) {
            // move the fleet to a random available space
            let randomIdx = Math.floor(Math.random() * availableMoves.length);

            // console.log('chosenMove', availableMoves[randomIdx]);

            moveFleetToTarget(fleet, availableMoves[randomIdx]);
        }

        //await let foo = setTimeout(() => {return 'foo';}, 500);
        await delay(500);
    }

    endTurn();
}

function delay(milliseconds) {
    return new Promise((resolved) => {
        setTimeout(resolved, milliseconds);
    })
}

function togglePlayerType(playerNumber) {
    // only called while player menu is open,
    // hence the call to renderPlayersList() at the end.

    if(computerPlayerNumbers.includes(playerNumber)) {
        computerPlayerNumbers = computerPlayerNumbers.filter(n => n !== playerNumber);
    } else {
        computerPlayerNumbers.push(playerNumber);
    }

    renderPlayersList();
}
