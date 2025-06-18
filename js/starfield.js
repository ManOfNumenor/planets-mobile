// just for fun, a simple starfield background
// future plans: nebulae and parallax

const STARFIELD_NUMSTARS = 10000; // per layer
const STARFIELD_PARALLAX_LAYERS = 3;
var cachedStarfields = [];

function drawStarfield() {
    
    if (!cachedStarfields.length) initStarfields();

    for (let x,y,parallaxScale,layerNum=0; layerNum < STARFIELD_PARALLAX_LAYERS; layerNum++) {
        parallaxScale = 1 - (layerNum * 0.2); // each layer scrolls less
        x = (sun.x*parallaxScale) - cachedStarfields[layerNum].width/2;
        y = (sun.y*parallaxScale) - cachedStarfields[layerNum].height/2;
        canvasContext.drawImage(cachedStarfields[layerNum],x,y);
    }
        
}

function initStarfields() {
    // renders a vast number of stars once at init
    console.log("creating starfield background");
    for (let layerNum=0; layerNum < STARFIELD_PARALLAX_LAYERS; layerNum++) {
        cachedStarfields[layerNum] = document.createElement("canvas");
        cachedStarfields[layerNum].context = cachedStarfields[layerNum].getContext('2d');
        // larger than playfield so we can scroll around
        cachedStarfields[layerNum].width = canvas.width * 2;
        cachedStarfields[layerNum].height = canvas.height * 2;
        for (var r,g,b,x,y,w,h,n=0; n<STARFIELD_NUMSTARS; n++) {
            r = g = b = Math.floor(50 + Math.random()*100);
            r += Math.floor(Math.random()*50-25);
            g += Math.floor(Math.random()*50-25);
            b += Math.floor(Math.random()*50); // boost the blue a bit
            x = Math.floor(Math.random()*cachedStarfields[layerNum].width);
            y = Math.floor(Math.random()*cachedStarfields[layerNum].height);
            w = h = 1; // Math.ceil(Math.random()*2); 
            cachedStarfields[layerNum].context.fillStyle = "rgba("+r+","+g+","+b+",1)";
            cachedStarfields[layerNum].context.fillRect(x,y,w,h);
        } // star loop
    } // for each layer
}