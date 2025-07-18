var isPaused = false;

function setupPause() {
    let pauseButton = document.createElement('button');
    pauseButton.id = 'pauseButton';
    pauseButton.textContent = 'Pause';
    pauseButton.onclick = togglePause;
    
    let endTurnButton = document.querySelector('button[onclick="endTurn()"]');
    endTurnButton.insertAdjacentElement('afterend', pauseButton);
}

function togglePause() {
    
    if (pauseSound) pauseSound.play();
    
    isPaused = !isPaused;
    let pauseMenuDiv = document.getElementById('pauseMenuDiv');
    
    if (isPaused) {
       pauseMenuDiv.style.display = 'flex';
    } else {
       pauseMenuDiv.style.display = 'none';
    }
}

function resumeGame() {
    isPaused = false;
    document.getElementById('pauseMenuDiv').style.display = 'none';
}

function mainMenu() {
    debug('Main menu will appear later');
}
