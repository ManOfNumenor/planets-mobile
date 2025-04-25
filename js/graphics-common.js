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

