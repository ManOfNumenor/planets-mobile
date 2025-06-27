var sun = {
    x: 1,
    y: 1,
    color: 'yellow',
    radius: 42,
};

function setupSun() {
    sun.x = canvas.width / 2;
    sun.y = canvas.height / 2;
}

function drawSun() {
    // console.log("drawing the sun! radius:"+sun.radius+" scaleFactor:"+scaleFactor+" which is:"+(sun.radius * scaleFactor * 2)+"px wide");
    // colorCircle(sun.x, sun.y, sun.radius * scaleFactor, sun.color);
    if (!sun.image) {
        // console.log("downloading sun.png");
        sun.image = new Image();
        sun.image.onload = function() { this.loaded=true; }
        sun.image.src = "../images/sun.png";
    }
    
    if (sun.image.loaded) {
        let sunRotation = performance.now() / 30000;
        let imgScale = ((sun.radius*2)/(sun.image.width*(2/3)))*scaleFactor;
        // the 2/3 above is because the bitmap has outer glow/shine lines that extend beyond the radius
        // console.log("drawing the sun scaled:"+imgScale+" which is:"+(sun.image.width*imgScale)+"px wide");
        drawBitmapCenteredWithRotationAndScale(sun.image,sun.x,sun.y,sunRotation,imgScale)
        // 2nd layer moves at a diff speed so the "shine lines" overlap and "glitter"
        drawBitmapCenteredWithRotationAndScale(sun.image,sun.x,sun.y,-sunRotation*.666,imgScale)
    }
}



