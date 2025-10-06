var isGameOver = false;
var currentPlayerNumber = 0;
var playerCount = 0;
var computerPlayerNumbers = [2];
var eliminatedPlayerNumbers = [];

function endTurn() {
    let endTurnButton = document.getElementById('endTurnButton');
    endTurnButton.setAttribute('disabled', true);
    
    if (endTurnSound) endTurnSound.play();

    advancePlayerNumber();

    console.log('before', currentPlayerNumber);
    skipAnyEliminatedPlayers();
    console.log('after', currentPlayerNumber);

    if(currentPlayerNumber === 0) {
        turnNumber++;
        movePlanetsAndProduceShips();
        eliminateLostPlayers();
        isGameOver = checkForEndOfGame();

        if(!isGameOver) {
            for(const fleet of allFleets) {
                fleet.movedThisTurn = false;
            }

            advancePlayerNumber();
        }
    }

    //window.alert(`player ${currentPlayerNumber}'s turn`);
    if(!computerPlayerNumbers.includes(currentPlayerNumber)) {
        alertDialog(`player ${currentPlayerNumber}'s turn`);
        endTurnButton.removeAttribute('disabled');
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

function skipAnyEliminatedPlayers() {
    let tries = 0;
    let limit = 10;
    while(eliminatedPlayerNumbers.includes(currentPlayerNumber) &&
        tries < limit) {

        advancePlayerNumber();

        if(tries === limit - 1) {
            console.error('Hit while loop limit in skipAnyEliminatedPlayers');
        } // end if

    } // end while

} // end function skipAnyEliminatedPlayers()

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

function eliminateLostPlayers() {
    for(let i=0;i<playerCount;i++) {
        let playerNumber = i + 1;

        let playerPlanets = planets.filter(planet => { 
            return planet.ownedByPlayer === playerNumber;
        });

        if(playerPlanets.length < 1 && 
            !eliminatedPlayerNumbers.includes(playerNumber)) {

            console.log('eliminated player: ', playerNumber);
            eliminatedPlayerNumbers.push(playerNumber);
            allFleets = allFleets.filter(
                fleet => fleet.ownedByPlayer !== playerNumber
            );

            // TODO: implement alert queueing or other player 
            // notification system. Currently attempting to show an 
            // alert when one is already up throws an error. Here
            // that error disabled the endTurn button permanently...
            //alertDialog('Player '+playerNumber+' has been defeated!');
        }
    }
}

function checkForEndOfGame() {
/*
    // FIXME - untested pseudocode - WIP
    let stillAlive = [];
    for (let f of allFleets) {
        if (f.ownedByPlayer != undefined) {
            stillAlive[f.ownedByPlayer] = true;
        }
    }
    for (let f of planets) {
        if (f.ownedByPlayer != undefined) {
            stillAlive[f.ownedByPlayer] = true;
        }
    }
    let pcount = 0;
    let thewinner;
    for (let p in stillAlive) { pcount++; thewinner = p; }
    
    if (pcount == 1) {
        console.log("GAME OVER - only one player with planets or fleets");
        if (computerPlayerNumbers.includes(thewinner)) {
            console.log("the last remaining player was a computer");
        } else {
            console.log("the last remaining player was a human");
        }
    }
*/
}

function drawScoreboard() {
    let totalShips = [0,0,0,0];
    let totalPlanets = [0,0,0,0];
    let totalFleets = [0,0,0,0];

    for (let f of allFleets) {
        totalShips[f.ownedByPlayer] += f.ships;
        totalFleets[f.ownedByPlayer]++;
    }

    for (let p of planets) {
        totalPlanets[p.ownedByPlayer]++;
    }

    let str = "";

    for (let i=0; i<playerCount; i++) {
        str += "Player "+i+": "
            +totalFleets[i]+" fleets, "
            +totalShips[i]+" ships, "
            +totalPlanets[i]+" planets ";
    }

    canvasContext.font = "8px sans-serif";
    canvasContext.fillStyle = "cyan";
    canvasContext.textAlign = "center";
    canvasContext.fillText(str,400,12);

}
