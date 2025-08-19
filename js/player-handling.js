var currentPlayerNumber = 0;
var playerCount = 0;
var computerPlayerIndecies = [2];

function endTurn() {
    
    if (endTurnSound) endTurnSound.play();

    advancePlayerNumber();

    if(currentPlayerNumber === 0) {
        turnNumber++;
        movePlanetsAndProduceShips();

        advancePlayerNumber();
    }

    //window.alert(`player ${currentPlayerNumber}'s turn`);
    if(!computerPlayerIndecies.includes(currentPlayerNumber)) {
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

function runComputerTurn() {
    let playerFleets = allFleets.filter(
        fleet => fleet.ownedByPlayer === currentPlayerNumber
    );

    for(const fleet of playerFleets) {
        let availableMoves = getAvailableMoves(fleet);

        // move the fleet to a random available space
        let randomIdx = Math.floor(Math.random() * availableMoves.length);

        // console.log('chosenMove', availableMoves[randomIdx]);

        moveFleetToTarget(fleet, availableMoves[randomIdx]);

    }

    endTurn();
}
