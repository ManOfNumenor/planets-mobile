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

}