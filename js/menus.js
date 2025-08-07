const MENU_KEYS = [
    'main',
    'level',
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
