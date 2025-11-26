// a particle effect for behind the logo
// only runs when the main menu is visible

var wormholeEffectEnabled = true;

function drawWormhole() {
    if (!wormholeEffectEnabled) return;
    //console.log("drawing wormhole effect!");

    let x = Math.round(canvas.width/2);
    let y = Math.round(canvas.height/2);
    let now = performance.now();
    let rot = 0;
    let maxSizePx = 1024; // on screen max 
    let size = 1; // scale of the image
    let ofs = 0; // offset in time for individual rings
    let speed = 2000;

    const numParticles = 8;
    for (let n=0; n<numParticles; n++) {
        rot = (n/numParticles) * Math.PI * 2;
        ofs = (n/numParticles) * 1500;
        size = (((now+ofs)/speed)%1) * maxSizePx * (1/wormholePic.width);
        drawBitmapCenteredWithRotationAndScale(wormholePic, x, y, rot, size);
    }

    // just for fun, add a few ships flying by
    let rotofs = -Math.PI*2;
    let rad = Math.min(x,y)/2; // orbit size = 1/4 the smallest screen dimension
    for (let sx,sy,n=0; n<numParticles; n++) {
        size = 1;
        sx = (Math.sin(now/2345) * rad);        
        sy = (Math.sin(now/1224) * rad);        
        rot = Math.atan2(sy, sx)+rotofs;
        size = Math.hypot(sx,sy) / rad;
        drawBitmapCenteredWithRotationAndScale(fleetPic1, x+sx, y+sy, rot, size);
        sx = (Math.sin(now/2000+1234.1234) * rad);        
        sy = (Math.sin(now/2430+2345.2345) * rad);        
        rot = Math.atan2(sy, sx)+rotofs;
        size = Math.hypot(sx,sy) / rad;
        drawBitmapCenteredWithRotationAndScale(fleetPic2, x+sx, y+sy, rot, size);
        sx = (Math.sin(now/1600+777.777) * rad);        
        sy = (Math.sin(now/2333+777.777) * rad);        
        rot = Math.atan2(sy, sx)+rotofs;
        size = Math.hypot(sx,sy) / rad;
        drawBitmapCenteredWithRotationAndScale(fleetPic3, x+sx, y+sy, rot, size);
        sx = (Math.sin(now/765.456) * rad);        
        sy = (Math.sin(now/1054.234) * rad);        
        rot = Math.atan2(sy, sx)+rotofs;
        size = Math.hypot(sx,sy) / rad;
        drawBitmapCenteredWithRotationAndScale(fleetPic4, x+sx, y+sy, rot, size);
    }

}