// remnants of pixel-planet experiments
var planet16x16 = document.createElement('img');
// var planet24x24 = document.createElement('img');
// var planet32x32 = document.createElement('img');
// var planet64x64 = document.createElement('img');
// var planet128x128 = document.createElement('img');
// 
// planet16x16.style.imageRendering = 'pixelated';
// planet24x24.style.imageRendering = 'pixelated';
// planet16x16.width = 32;
// planet16x16.height = 32;
// planet24x24.width = 48;
// planet24x24.height = 48;

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
		{varName: planet16x16, theFile: "pixel-planets/planet-16-x-16.png"},
		// {varName: planet24x24, theFile: "pixel-planets/planet-24-x-24.png"},
		// {varName: planet32x32, theFile: "pixel-planets/planet-32-x-32.png"},
		// {varName: planet64x64, theFile: "pixel-planets/planet-64-x-64.png"},
		// {varName: planet128x128, theFile: "pixel-planets/planet-128-x-128.png"},

        /*
		{worldType: WORLD_FLOOR, theFile: "world_floor.png"},
		{worldType: WORLD_WALL, theFile: "world_brick.png"},
		{worldType: WORLD_GOAL, theFile: "Coins1.png"},
		{worldType: WORLD_DOOR, theFile: "Door1.png"},
		{worldType: WORLD_KEY, theFile: "Key1.png"}
        */
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
