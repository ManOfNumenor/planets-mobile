// just for fun, a simple starfield background
// future plans: nebulae and parallax

const NUMSTARS = 20000;
var cachedStarfield = null;

function drawStarfield() {
    
    // render a vast number of stars once at init
    if (!cachedStarfield) {
        console.log("creating starfield background");
        cachedStarfield = document.createElement("canvas");
        // larger than playfield so we can scroll around
        cachedStarfield.width = canvas.width * 2;
        cachedStarfield.height = canvas.height * 2;
        cachedStarfieldCTX = cachedStarfield.getContext('2d');
        cachedStarfieldCTX.fillRect(0,0,cachedStarfield.width,cachedStarfield.height);
        for (var r,g,b,x,y,w,h,n=0; n<NUMSTARS; n++) {
            r = g = b = Math.floor(50 + Math.random()*100);
            r += Math.floor(Math.random()*50-25);
            g += Math.floor(Math.random()*50-25);
            b += Math.floor(Math.random()*50); // boost the blue a bit
            x = Math.floor(Math.random()*cachedStarfield.width);
            y = Math.floor(Math.random()*cachedStarfield.height);
            //w = h = Math.ceil(Math.random()*2); // random from 1 to 3px?
            w = h = 1;
            cachedStarfieldCTX.fillStyle = "rgba("+r+","+g+","+b+",1)";
            cachedStarfieldCTX.fillRect(x,y,w,h);
        }
    }

    // draw the stars onto the game canvas every frame
    canvasContext.drawImage(cachedStarfield,sun.x-cachedStarfield.width/2,sun.y-cachedStarfield.height/2);
}