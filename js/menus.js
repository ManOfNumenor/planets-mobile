const MENU_KEYS = [
    'main',
    'level',
    'players',
    'credits',
];

function getMenuDiv(menuKey) {
    let menuDivId = menuKey + 'MenuDiv';

    let menuDiv = document.getElementById(menuDivId);

    return menuDiv;
}

function showMenu(menuKey) {
    hideAllMenus();

    let menuDiv = getMenuDiv(menuKey);

    menuDiv.style.display = 'flex';
}

function hideAllMenus() {
    for(const key of MENU_KEYS) {
        hideMenu(key);
    }
}

function hideMenu(menuKey) {
    let menuDiv = getMenuDiv(menuKey);

    menuDiv.style.display = 'none';
}

// case-insensitive template logic, so this function gets a snake_case name
function start_first_turn() {
    hideAllMenus();
    alertDialog("<b>Player 1: Prepare for Battle!</b><br><br>Take control of the solar system<br>by moving units to capture planets."); // TODO intro blurb here
}

function renderPlayersList() {
    // level is already loaded at this point, so gloabal playerCount is set correctly

    let template = ``;

    for(let i=0;i<playerCount;i++) {
        //console.log('adding template', i, computerPlayerNumbers.includes(i));
        let playerNumber = i+1;
        template +=`<div class="player-select-box">
        <img src="images/player${playerNumber}Icon.png"/>
        <button onclick="togglePlayerType(${playerNumber})">
        ${computerPlayerNumbers.includes(playerNumber) ? "Computer" : "Human"}
        </button>
        </div>`;
    }

    template += `<button onclick="start_first_turn()"> PLAY </button>`;

    let playerMenuDiv = getMenuDiv('players');

    playerMenuDiv.innerHTML = template;

    showMenu('players');
}
