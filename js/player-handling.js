var currentPlayerNumber = 0;
var playerCount = 0;

function advancePlayerNumber() {
    currentPlayerNumber++;

    if(currentPlayerNumber > playerCount) {
        currentPlayerNumber = 0;
    }
}
