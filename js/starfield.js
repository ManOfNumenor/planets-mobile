// simple starfield background with nebulae and parallax

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

// new version: use two image files for speed and simplicity
function initStarfields() {
    cachedStarfields = [nebulaePic,starsPic,starsPic];
}

/* 
// old version: uses perlin noise to
// render a vast number of stars+clouds once at init
// but takes several seconds on mobile devices!
function initStarfields() {
    for (let layerNum=0; layerNum < gameOptions.starfieldLayerCount; layerNum++) {
        console.log("creating starfield background layer "+layerNum);
        cachedStarfields[layerNum] = document.createElement("canvas");
        cachedStarfields[layerNum].context = cachedStarfields[layerNum].getContext('2d');
        // larger than playfield so we can scroll around
        cachedStarfields[layerNum].width = gameOptions.starfieldWidth; //canvas.width * 4;
        cachedStarfields[layerNum].height = gameOptions.starfieldHeight; //canvas.height * 4;
        if (layerNum==gameOptions.starfieldLayerCount-1) {
            // fartheset parallax layer also has nebulae
            // reddish main blobs
            drawNebulae(cachedStarfields[layerNum].context);
            // plus some extra layers for variety?
            // FIXME: this function replaces the last layer - not blended
            //drawNebulae(cachedStarfields[layerNum].context,1024,0.1,0.9,0.9,64,777,666);
            //drawNebulae(cachedStarfields[layerNum].context,512,1,1,1,64,5435,4321);
            //drawNebulae(cachedStarfields[layerNum].context,128,1,0,1,64,100,500);
        }
        // fill the layer with stars
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
*/

