function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function outlineRect(topLeftX, topLeftY, boxWidth, boxHeight, lineColor) {
  canvasContext.strokeStyle = lineColor;
  canvasContext.beginPath();
  canvasContext.rect(topLeftX, topLeftY, boxWidth, boxHeight);
  canvasContext.stroke();
}

function coloredOutlineRectCornerToCorner(corner1X, corner1Y, corner2X, corner2Y, lineColor) {
  canvasContext.strokeStyle = lineColor;
  canvasContext.beginPath();
  canvasContext.rect(corner1X, corner1Y, corner2X-corner1X, corner2Y-corner1Y);
  canvasContext.stroke();
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.fill();
}

function outlineCircle(centerX, centerY, radius, strokeColor) {
  canvasContext.strokeStyle = strokeColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
  canvasContext.stroke();
}
  
function drawBitmapCenteredWithRotation(graphic, atX, atY,withAngle) {
  canvasContext.save(); // allows us to undo translate movement and rotate spin
  canvasContext.translate(atX,atY); // sets the point where our graphic will go
  canvasContext.rotate(withAngle); // sets the rotation
  canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2); // center, draw
  canvasContext.restore(); // undo the translation movement and rotation since save()
}

function drawBitmapCenteredWithRotationAndScale(graphic, x, y, angleInRadians=0, scale=1) {
    let width = graphic.width;
    let height = graphic.height;
    // Save the current canvas state (transformations)
    canvasContext.save();
    // Translate to the center of the sprite
    // This makes the rotation and scaling happen around the sprite's origin
    //canvasContext.translate(x - width*scale / 2, y - height*scale / 2);
    canvasContext.translate(x,y);
    // Apply rotation
    canvasContext.rotate(angleInRadians);
    // Apply scaling
    canvasContext.scale(scale, scale);
    // Draw the image, offsetting its position so its center aligns with the translated origin
    canvasContext.drawImage(graphic, -width / 2, -height / 2, width, height);
    // Restore the canvas state to its original (before these transformations)
    canvasContext.restore();
}

function colorText(showWords, textX,textY, fillColor) {
    canvasContext.font = "16px sans-serif";
    canvasContext.fillStyle = fillColor;
    canvasContext.fillText(showWords, textX,textY);
}

/*
function drawText(fontSize, color, textAlign, text, x, y){
  canvasContext.save();
  canvasContext.textBaseline = "top";
  canvasContext.font = fontSize+"pt Stick";
  canvasContext.fillStyle = color;
  canvasContext.textAlign = textAlign;
  canvasContext.fillText(text, x, y);
  canvasContext.restore();
}
*/

function colorTriangle(centerX, centerY, size,angle, fillColor) {
    canvasContext.save(); // allows us to undo translate movement and rotate spin
  canvasContext.translate(centerX,centerY); // sets the point where our graphic will go
  canvasContext.rotate(angle); // sets the rotation

    // actually draw the triangle
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.moveTo(0, -size);
    canvasContext.lineTo(-size/2, size/2);
    canvasContext.lineTo(0,0);
    canvasContext.lineTo(size/2, size/2);
    canvasContext.fill();

    canvasContext.restore(); // undo the translation movement and rotation since save()
}

function colorLine(startX, startY, endX, endY, lineColor) {
    canvasContext.strokeStyle = lineColor;
    canvasContext.beginPath();
    canvasContext.moveTo(startX, startY);
    canvasContext.lineTo(endX, endY);
    canvasContext.stroke();
}

// creates a gradient fillstyle angled to point at the sun
function gradientAtSunAngle(x,y,radius, radial=false) {
    const angleRadians = Math.atan2(y-sun.y,x-sun.x);
    //console.log("grad: sun:"+Math.round(sun.x)+","+Math.round(sun.y)+" planet:"+Math.round(x)+","+Math.round(y)+" radius:"+Math.round(radius)+" angle:"+Math.round(angleRadians*(180/Math.PI)));

    if(radial) {
        // had to build a 45 degree version to wrap my head around the math
        // return canvasContext.createRadialGradient(
        //     x - radius, y - radius, radius / 4,
        //     x, y, radius * 2,
        // );

        const x1 = x - (radius * Math.cos(angleRadians));
        const y1 = y - (radius * Math.sin(angleRadians));    
        const x2 = x;
        const y2 = y;    

        return canvasContext.createRadialGradient(x1,y1,radius / 4, x2,y2, radius * 2);

    } else {
        const x1 = x - (radius * Math.cos(angleRadians));
        const y1 = y - (radius * Math.sin(angleRadians));    
        const x2 = x + (radius * Math.cos(angleRadians));
        const y2 = y + (radius * Math.sin(angleRadians));    

        return canvasContext.createLinearGradient(x1,y1,x2,y2);
    }
}

function shadeCircle(centerX, centerY, radius) {
    let extraShadowWidth = 3 * scaleFactor; 
        // for hiding atmo, 1px line, etc

    /* 45 degree angle version - works great
    let shadowGradient = canvasContext.createLinearGradient(
        centerX - radius, centerY - radius,
        centerX + radius, centerY + radius,
    ); */

    let shadowGradient = null;
    if(gameOptions.radialPlanetShadows) {
        shadowGradient = gradientAtSunAngle(centerX, centerY, radius, true);

        shadowGradient.addColorStop(0, 'transparent');
        shadowGradient.addColorStop(0.4, 'rgba(0,0,0, 0.4)');
        shadowGradient.addColorStop(0.6, 'black');
    } else {
        shadowGradient = gradientAtSunAngle(centerX, centerY, radius);

        shadowGradient.addColorStop(0, 'transparent');
        shadowGradient.addColorStop(0.4, 'rgba(0,0,0, 0.4)');
        shadowGradient.addColorStop(0.6, 'black');
    }

    canvasContext.fillStyle = shadowGradient;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius + extraShadowWidth, 0, Math.PI*2, true);
    canvasContext.fill();
}
