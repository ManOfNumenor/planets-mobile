// just for fun, a simple starfield background
// future plans: nebulae and parallax

var cachedStarfields = [];

function drawStarfield() {
    
    if (!cachedStarfields.length) initStarfields();

    for (let x,y,parallaxScale,layerNum=0; layerNum < cachedStarfields.length; layerNum++) {
        parallaxScale = 1 - (layerNum * 0.2); // each layer scrolls less
        x = Math.round((sun.x*parallaxScale) - cachedStarfields[layerNum].width/2);
        y = Math.round((sun.y*parallaxScale) - cachedStarfields[layerNum].height/2);
        canvasContext.drawImage(cachedStarfields[layerNum],x,y);
    }
        
}

function initStarfields() {
    // renders a vast number of stars once at init
    console.log("creating starfield background");
    for (let layerNum=0; layerNum < gameOptions.starfieldLayerCount; layerNum++) {
        cachedStarfields[layerNum] = document.createElement("canvas");
        cachedStarfields[layerNum].context = cachedStarfields[layerNum].getContext('2d');
        // larger than playfield so we can scroll around
        cachedStarfields[layerNum].width = gameOptions.starfieldWidth; //canvas.width * 4;
        cachedStarfields[layerNum].height = gameOptions.starfieldHeight; //canvas.height * 4;
        for (var r,g,b,x,y,w,h,n=0; n<gameOptions.starfieldStarsPerLayer; n++) {
            r = g = b = Math.floor(50 + Math.random()*100); // mostly grey
            r += Math.floor(Math.random()*50-25); // with a little rainbow
            g += Math.floor(Math.random()*50-25); // randomness
            b += Math.floor(Math.random()*50); // boost the blue a bit
            x = Math.floor(Math.random()*cachedStarfields[layerNum].width);
            y = Math.floor(Math.random()*cachedStarfields[layerNum].height);
            w = h = 1; // Math.ceil(Math.random()*2); 
            if (Math.random()<0.15) w = h = 2; // occasional big stars
            cachedStarfields[layerNum].context.fillStyle = "rgba("+r+","+g+","+b+",1)";
            cachedStarfields[layerNum].context.fillRect(x,y,w,h);
        } // star loop
    } // for each layer
}