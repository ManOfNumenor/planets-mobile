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

function drawBitmapCenteredWithRotationAndScale(graphic, x, y, angleInRadians, scale) {
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

function shadeCircle(centerX, centerY, radius) {

    let shadowGradient = canvasContext.createLinearGradient(
        centerX - radius, centerY - radius,
        centerX + radius, centerY + radius,
    );

    shadowGradient.addColorStop(0, 'transparent');
    shadowGradient.addColorStop(0.4, 'rgba(0,0,0, 0.4)');
    shadowGradient.addColorStop(0.6, 'black');

    canvasContext.fillStyle = shadowGradient;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}
