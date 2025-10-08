// a non-modal fade-out popup for game events

let notifyString = "";
let notifyCurrentAlpha = 0;
let notifyFadeSpeed = 0.0075;
let notifyFont = "24px sans-serif";
let notifyColor = "white";
let notify_Y = 128;

function startNotification(str) {
    notifyString = str;
    notifyCurrentAlpha = 1;
}

function drawNotifications() {
    notifyCurrentAlpha -= notifyFadeSpeed;
    if (notifyCurrentAlpha <= 0) return;
    canvasContext.globalAlpha = notifyCurrentAlpha;
    let x = Math.round(canvas.width/2);
    let y = notify_Y; //Math.round(canvas.height/2);
    canvasContext.drawImage(notificationBG,x-notificationBG.width/2,y-notificationBG.height/2-8);
    canvasContext.font = notifyFont;
    canvasContext.textAlign = "center";
    canvasContext.fillStyle = "black";
    canvasContext.fillText(notifyString,x+2,y+2);
    canvasContext.fillStyle = notifyColor;
    canvasContext.fillText(notifyString,x,y);
    canvasContext.globalAlpha = 1;
}