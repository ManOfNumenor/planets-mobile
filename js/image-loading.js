var fleetSelectionOutlinePic = document.createElement('img');
var fleetIconPic = document.createElement('img');
var player1IconPic = document.createElement('img');
var player2IconPic = document.createElement('img');
var player3IconPic = document.createElement('img');
var player4IconPic = document.createElement('img');
var ownedByPlayer1Pic = document.createElement('img');
var ownedByPlayer2Pic = document.createElement('img');
var canMoveHerePic = document.createElement('img');

var boomPic = document.createElement('img');
var moonPic = document.createElement('img');
var cloudPic = document.createElement('img');
var sunspotPic = document.createElement('img');
var ringsFrontPic = document.createElement('img');
var ringsBackPic = document.createElement('img');

var cratersPic = document.createElement('img');
var polarIcePic = document.createElement('img');
var icePic = document.createElement('img');
var lavaPic = document.createElement('img');

var starsPic = document.createElement('img');
var nebulaePic = document.createElement('img');

var sunDefault = document.createElement('img');
var sunDark = document.createElement('img');
var sunNeutron = document.createElement('img');
var sunRedGiant = document.createElement('img');
var sunWhiteDwarf = document.createElement('img');

var flagIcon = document.createElement('img');

var worldPics = [];

var picsToLoad = 0; //set automatically based on number of imageList in loadImages()


function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
	//console.log(picsToLoad);
	if(picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady();
	imgVar.src = "images/" + fileName;
}

function loadImageForWorldCode(worldCode, fileName) {
	worldPics[worldCode] = document.createElement("img");
	beginLoadingImage(worldPics[worldCode], fileName);
}

function loadImages() {

	var imageList = [
        // apparently you need to leave at least one image in here, 
        // or imageLoadingDoneSoStartGame() never gets called
        {varName: boomPic, theFile: "boom.png"},
        {varName: moonPic, theFile: "moon.png"},
        {varName: cloudPic, theFile: "clouds.png"},
        {varName: sunspotPic, theFile: "sunspots.png"},
        {varName: ringsFrontPic, theFile: "rings-front.png"},
        {varName: ringsBackPic, theFile: "rings-back.png"},

        {varName: cratersPic, theFile: "craters.png"},
        {varName: polarIcePic, theFile: "polarIce.png"},
        {varName: icePic, theFile: "ice.png"},
        {varName: lavaPic, theFile: "lava.png"},

        {varName: nebulaePic, theFile: "nebulae.jpg"},
        {varName: starsPic, theFile: "stars.png"},

        {varName: sunDefault, theFile: "sun.png"},
        {varName: sunDark, theFile: "sun-dark.png"},
        {varName: sunNeutron, theFile: "sun-neutron.png"},
        {varName: sunRedGiant, theFile: "sun-red-giant.png"},
        {varName: sunWhiteDwarf, theFile: "sun-white-dwarf.png"},

        {varName: ownedByPlayer1Pic, theFile: "ownedByPlayer1.png"},
        {varName: ownedByPlayer2Pic, theFile: "ownedByPlayer2.png"},
        {varName: canMoveHerePic, theFile: "canMoveHere.png"},

        {varName: fleetSelectionOutlinePic, theFile: "fleetSelectionOutline.png"},
        {varName: fleetIconPic, theFile: "fleetIcon.png"},
        {varName: player1IconPic, theFile: "player1Icon.png"}, 
        {varName: player2IconPic, theFile: "player2Icon.png"}, 
        {varName: player3IconPic, theFile: "player3Icon.png"}, 
        {varName: player4IconPic, theFile: "player4Icon.png"}, 

        {varName: flagIcon, theFile: "flagIcon.png"}, 

		];

	picsToLoad = imageList.length;

	for(var i=0; i<imageList.length; i++) { 
		if(imageList[i].varName != undefined) {
			beginLoadingImage(imageList[i].varName, imageList[i].theFile);
		} else {
			loadImageForWorldCode( imageList[i].worldType, imageList[i].theFile );
		}	
	}
}
