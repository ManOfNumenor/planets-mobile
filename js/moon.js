// a little experiment we may not use in the game:
// orbital bodies like moons, rings, and satellites

const MOONS_ENABLED = false; // set false to remove all this lunacy

function drawAllMoons(moons,planetx,planety) {
    //console.log("drawing all these moons:",moons);
    if (!moons) return;
    moons.forEach(m => {
        // m is an array of [dist,speed,radius]
        let ang = performance.now() / 10000 * m[1];
        let mx = planetx + (m[0] * scaleFactor * Math.cos(ang));
        let my = planety + (m[0] * scaleFactor * Math.sin(ang));
        drawMoon(mx,my,m[2])
    });
}

function drawMoon(x,y,radius) {
    //console.log("drawing a moon at "+Math.round(x)+","+Math.round(y));
    let rot = 0;
    let imgScale = ((radius*2)/(moonPic.width))*scaleFactor;
    // console.log("drawing a moon scaled:"+imgScale+" which is:"+(moonPic.width*imgScale)+"px wide");
    drawBitmapCenteredWithRotationAndScale(moonPic,x,y,rot,imgScale)
}
