const MENU_KEYS = [
    'main',
    'level',
    'players',
    'credits',
    'options',
    'pause', // kind of a special case, see pause.js
];

// Add new levels here and to the scripts in index.html!
// These definitions are in this file rather than level-handling.js due to load order!
const LEVELS = [
    //{
    //    uid: testLevel,
    //    display: "Test Level",
    //    img: "",
    //},
    {
        uid: quadraticSmall,
        display: "Quadratic Small",
        img: "",
    },
    {
        uid: quadraticLarge,
        display: "Quadratic Large",
        img: "",
    },
    {
        uid: quadraticSmallPruned,
        display: "Pruned Quadratic Sm",
        img: "",
    },
    {
        uid: quadraticLargePruned,
        display: "Pruned Quadratic Lg",
        img: "",
    },
    {
        uid: oculus,
        display: "Oculus",
        img: "",
    },
    {
        uid: trilane,
        display: "Tri-lane",
        img: "",
    },
    {
        uid: radialgrid,
        display: "Radial Grid",
        img: "",
    },
    {
        uid: xiphosuran,
        display: "Xiphosuran",
        img: "",
    },
    {
        uid: blackhole,
        display: "Black Hole",
        img: "",
    },
    {
        uid: bowtie,
        display: "Cosmic Bowtie",
        img: "",
    },
    {
        uid: hanaous,
        display: "Hanaous",
        img: "",
    },
];

const levelSelectImage = document.getElementById("levelSelectImage");
const levelSelectDisplay = document.getElementById("levelSelectDisplay");
var selectedLevelIdx = 0; //  int for LEVEL_KEYS item, used in level select screen


function getMenuDiv(menuKey) {
    let menuDivId = menuKey + 'MenuDiv';

    let menuDiv = document.getElementById(menuDivId);

    return menuDiv;
}

function showMenu(menuKey) {
    console.log("SHOWING MENU: "+menuKey);
    hideAllMenus();
    let menuDiv = getMenuDiv(menuKey);
    menuDiv.style.display = 'flex';
    wormholeEffectEnabled = (menuKey == "main");
    
    if (menuKey === 'level') {
        levelSelect(selectedLevelIdx)
    }
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

function navigateBackFromOptionsMenu() {
    if (playerCount > 0) {
        showMenu('pause');
    } else {
        showMenu('main');
    }
}

// case-insensitive template logic, so this function gets a snake_case name
function start_first_turn() {
    hideAllMenus();
    if (isComputerPlayerCurrentPlayer()) 
    {
        alertDialog("<b>Computer Player 1 Prepares for Battle!", () =>  runComputerTurn());
    } 
    else
    {
        alertDialog("<b>Player 1: Prepare for Battle!</b><br><br>Take control of the solar system<br>by moving units to capture planets."); // TODO intro blurb here
    }
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

// This method just allows for default fallback values
function getLevel(index) {
    let tmpLevel = {
        uid: testLevel, // Object name
        display: "EMPTY", // Display name for level select menu
        img: "images/canMoveHere.png", // Image preview source
    };

    if (LEVELS[index]) {
        tmpLevel.uid = LEVELS[index].uid ? LEVELS[index].uid : tmpLevel.uid;
        tmpLevel.display = LEVELS[index].display ? LEVELS[index].display : tmpLevel.display;
        tmpLevel.img = LEVELS[index].img ? LEVELS[index].img : tmpLevel.img;
    };

    return tmpLevel;
}

function levelSelect(index) {
    // Display for levels in level select menu

    // Wrap the index
    if (index < 0) {
        index = LEVELS.length - 1;
    } else if (index >= LEVELS.length) {
        index = 0;
    }
    selectedLevelIdx = index;

    //console.log("Level select:", LEVELS[selectedLevelIdx].display);
    levelSelectImage.src = getLevel(selectedLevelIdx).img;
    levelSelectDisplay.innerHTML = getLevel(selectedLevelIdx).display; //LEVELS[selectedLevelIdx].display;
}