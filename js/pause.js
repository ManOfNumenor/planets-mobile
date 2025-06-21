var isPaused = false;

function setupPause() {
    let pauseButton = document.createElement('button');
    pauseButton.id = 'pauseButton';
    pauseButton.textContent = 'Pause';
    pauseButton.onclick = togglePause;
    
    let endTurnButton = document.querySelector('button[onclick="endTurn()"]');
    endTurnButton.insertAdjacentElement('afterend', pauseButton);
    
    let resumeButton = document.createElement('button');
    resumeButton.id = 'resumeButton';
    resumeButton.textContent = 'Resume';
    resumeButton.onclick = resumeGame;
    resumeButton.style.display = 'none';
    
    let mainMenuButton = document.createElement('button');
    mainMenuButton.id = 'mainMenuButton';
    mainMenuButton.textContent = 'Main Menu';
    mainMenuButton.onclick = mainMenu;
    mainMenuButton.style.display = 'none';

    pauseButton.insertAdjacentElement('afterend', resumeButton);
    resumeButton.insertAdjacentElement('afterend', mainMenuButton);
}

function togglePause() {
    isPaused = !isPaused;
    let resumeButton = document.getElementById('resumeButton');
    let mainMenuButton = document.getElementById('mainMenuButton');
    
    if (isPaused) {
        resumeButton.style.display = 'inline-block';
        mainMenuButton.style.display = 'inline-block';
    } else {
        resumeButton.style.display = 'none';
        mainMenuButton.style.display = 'none';
    }
}

function resumeGame() {
    isPaused = false;
    document.getElementById('resumeButton').style.display = 'none';
    document.getElementById('mainMenuButton').style.display = 'none';
}

function mainMenu() {
    debug('Main menu will appear later');
}
