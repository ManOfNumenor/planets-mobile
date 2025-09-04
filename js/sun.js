const SUNSPOTS_ENABLED = true;
const SUNSPOT_SCROLL_SPEED = 1.75;
const SUNSPOT_OPACITY = 0.35;

var sun = {
    x: 1,
    y: 1,
    color: 'yellow',
    radius: 42,
    isBinaryStar: false
};

function setupSun() {
    sun.x = canvas.width / 2;
    sun.y = canvas.height / 2;
}

function drawSun() {
    // console.log("drawing the sun! radius:"+sun.radius+" scaleFactor:"+scaleFactor+" which is:"+(sun.radius * scaleFactor * 2)+"px wide");
    // colorCircle(sun.x, sun.y, sun.radius * scaleFactor, sun.color);
    
    // FIXME: use standard image-loading.js code instead
    if (!sun.image) {
        // console.log("downloading sun.png");
        sun.image = new Image();
        sun.image.onload = function() { this.loaded=true; }
        sun.image.src = "../images/sun.png";
    }

    if (!sun.image.loaded) return;

    // used by binary star rendering (defaults are for single star)
    let extraScale = 1;
    let extraOffset = 0;
    let sunCount = 1;

    if (sun.isBinaryStar) {
        sunCount = 2;
        extraScale = 0.3333; // draw smaller to fit two suns
        extraOffset = sun.radius * 0.5 * scaleFactor; // nudge over
    }
    
    for (let sunNum = 0; sunNum<sunCount; sunNum++) {
        let sunRotation = performance.now() / 30000;
        let imgScale = ((sun.radius*2)/(sun.image.width*(2/3)))*scaleFactor;
        // the 2/3 above is because the bitmap has outer glow/shine lines that extend beyond the radius
        
        // binary system: draw smaller and offset from each other
        imgScale *= extraScale;
        let ofs = sunNum?extraOffset:-extraOffset;
        // binary stars orbit each other
        let now = performance.now() * 0.0001;
        let ofsx = Math.cos(now) * ofs;
        let ofsy = Math.sin(now) * ofs;
        
        // console.log("drawing the sun scaled:"+imgScale+" which is:"+(sun.image.width*imgScale)+"px wide");
        drawBitmapCenteredWithRotationAndScale(sun.image,sun.x+ofsx,sun.y+ofsy,sunRotation,imgScale)
        // 2nd layer moves at a diff speed so the "shine lines" overlap and "glitter"
        drawBitmapCenteredWithRotationAndScale(sun.image,sun.x+ofsx,sun.y+ofsy,-sunRotation*.666,imgScale)
        if (SUNSPOTS_ENABLED) drawSunspots(sun.x+ofsx,sun.y+ofsy,sun.radius*scaleFactor*extraScale,SUNSPOT_SCROLL_SPEED);
    }
}

function drawSunspots(x,y,radius,speed) {
    //console.log("drawing sunspots at "+x+","+y);
    // FIXME: radius seems to need to be a bit bigger: s the sun src art offsize?
    radius *= 1.125;
    canvasContext.save(); 
    // create a circular "clipping" path
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, Math.PI*2, true);
    canvasContext.clip(); // now whatever we draw has to be inside the path
    // scroll through a seamless panorama
    let dx = (performance.now()/1000*speed) % sunspotPic.width;
    let dy = 0;
    let w = radius*2;
    let h = radius*2;
    canvasContext.globalAlpha = SUNSPOT_OPACITY;
    
    // old version: looked strange when zooming
    // canvasContext.drawImage(sunspotPic,dx,dy,w,h,x-w/2,y-h/2,w,h);

    // new version: constant size for source px
    canvasContext.drawImage(sunspotPic,dx,dy,256,256,x-w/2,y-h/2,w,h);
    
    canvasContext.restore();
}


