var isGameOver = false;
var currentPlayerNumber = 0;
var playerCount = 0;
var computerPlayerNumbers = [2];
var eliminatedPlayerNumbers = [];

function endTurn() {
    let endTurnButton = document.getElementById('endTurnButton');
    endTurnButton.setAttribute('disabled', true);
    
    deselectEntities();
    
    if (endTurnSound) endTurnSound.play();

    advancePlayerNumber();

    console.log('before skip', currentPlayerNumber);
    skipAnyEliminatedPlayers();
    console.log('after skip', currentPlayerNumber);

    if(currentPlayerNumber === 0) {
        turnNumber++;
        movePlanetsAndProduceShips();
        eliminateLostPlayers();
        checkForEndOfGame();

        if(!isGameOver) {
            for(const fleet of allFleets) {
                fleet.movedThisTurn = false;
            }

            advancePlayerNumber();
            skipAnyEliminatedPlayers();
        }
    }

    if(!isGameOver) {
        //window.alert(`player ${currentPlayerNumber}'s turn`);
        if(!computerPlayerNumbers.includes(currentPlayerNumber)) {
            alertDialog(`player ${currentPlayerNumber}'s turn`);
            endTurnButton.removeAttribute('disabled');
        } else {
            runComputerTurn();
        }
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

            startNotification('Player '+playerNumber+' has been defeated!');
        }
    }
}

function checkForEndOfGame() {
    // console.log('checkForEndOfGame');

    let stillAlive = []; // a list of players found alive

    // look for any fleets
    for (let f of allFleets) {
        if (f.ownedByPlayer != undefined && f.ownedByPlayer !== 0) {
            stillAlive[f.ownedByPlayer] = true;
        }
    }

    // or owned planets
    for (let f of planets) {
        if (f.ownedByPlayer != undefined && f.ownedByPlayer !== 0) {
            stillAlive[f.ownedByPlayer] = true;
        } 
    }

    // console.log('stillAlive', stillAlive);
    
    // see if there's only one player (cpu or human) left
    let gameResultText = "";
    let pcount = 0;
    let thewinner; // remember the last seen alive player number
    for (let p in stillAlive) { pcount++; thewinner = p; }
    
    // console.log('pcount', pcount);
    // finally, we can detect gameover
    if (pcount == 1) {
        console.log("GAME OVER - only one player with planets or fleets");
        // FIXME: the cpu player (player #2)
        // is not in this array?!?! huh????? -----v
        if (computerPlayerNumbers.includes(thewinner)) {
            console.log("the last remaining player was a computer");
            startNotification("YOU HAVE BEEN DEFEATED. GAME OVER.");
            gameResultText = "Player "+thewinner+" was victorious.";
        } else {
            console.log("the last remaining player was a human");
            startNotification("PLAYER "+thewinner+" WINS!");
            gameResultText = "Player "+thewinner+" was victorious.";
        }
        // TODO: actually stop the game from running,
        // perhaps with a modal "return to the main menu" prompt
        isGameOver = true;
        document.getElementById("gameResultDiv").innerHTML = gameResultText;
        document.getElementById("gameoverGUI").style.display='block';
    }

    // console.log('done with checkForEndOfGame():', isGameOver);
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

    canvasContext.font = "9px sans-serif";
    canvasContext.fillStyle = "cyan";
    canvasContext.textAlign = "center";
    canvasContext.fillText(str,canvas.width/2,12);

}

// DEBUG ONLY: force an instant gameover condition
function instantWin() {
    console.log("forcing player 1 to win!");
    for (let f of allFleets) { f.ownedByPlayer = 1; }
    for (let p of planets) { p.ownedByPlayer = 1; }
    checkForEndOfGame();
}
function instantLose() {
    console.log("forcing player 2 to win!");
    for (let f of allFleets) { f.ownedByPlayer = 2; }
    for (let p of planets) { p.ownedByPlayer = 2; }
    checkForEndOfGame();
}

function restartGame() {
    window.location.reload();
}
