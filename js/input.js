const TWO_TOUCH_ZOOM_FACTOR = 0.01;
// var draggingTouchId = null;
var dragStartEvt = null;
var startingSunCoords = null;
var prevZoomDiff = -1;
// var zooming = false;
var currentPointerEvents = [];
var pointerDebugMode = true;

function setupInput() {
    canvas.addEventListener('pointerdown', pointerdownHandler,{passive: false});
    canvas.addEventListener('pointerup', pointerupHandler,{passive: false});
    canvas.addEventListener('pointermove', pointermoveHandler,{passive: false});
    canvas.addEventListener('pointercancel', pointercancelHandler,{passive: false});
    canvas.addEventListener('pointerout', pointerupHandler,{passive: false});
    // canvas.addEventListener('pointerleave', pointerupHandler);
    // cancel normal touch events on canvas
    // canvas.addEventListener('touchstart', (evt) => evr.preventDefault());

    // canvas.addEventListener('mousedown', mousedownHandler);
    // canvas.addEventListener('mouseup', mouseupHandler);
    document.addEventListener('keyup', keyupHandler);

    let scaleFactorInput = document.getElementById('scaleFactorInput');
    scaleFactorInput.addEventListener('input',
        (evt) => {
            scaleFactor = Math.max( 0, evt.target.value / 50 );
            // never go less than 0 or map drawing math breaks
        });
}

// TODO: are we:
// 1. dragging the map around 
//  - one pointer with movement
// 2. pinching to zoom?
//  - two pointers moving closer or further apart
// 3. tapping to select a planet
//  - one pointer down/up quickly  without movement

function pointerdownHandler(evt) {
    evt.preventDefault();
    debug('pointerdown');
    console.log('pointerdown evt', evt);

    currentPointerEvents.push(evt);
    console.log('currentPointerEvents', currentPointerEvents);

    if(!dragStartEvt && !startingSunCoords) {
        // no existing dragging anchors,
        // make new ones
        dragStartEvt = evt;
        startingSunCoords = {
            x: sun.x,
            y: sun.y,
        };
    }
    pointerDebug();
}

function pointermoveHandler(evt) {
    evt.preventDefault();
    debug('pointermove');
    
    // update currentPointerEvents with new coords
    for(let i=0;i<currentPointerEvents.length;i++) {
        
        if(currentPointerEvents[i].pointerId ==
            evt.pointerId) {

            currentPointerEvents[i] = evt;
            break;
        }
    }

    if(evt.pointerId == dragStartEvt.pointerId) {
        // update dragging positions
        let diffX = evt.clientX - dragStartEvt.clientX;
        let diffY = evt.clientY - dragStartEvt.clientY;

        sun.x = startingSunCoords.x + diffX;
        sun.y = startingSunCoords.y + diffY;
    }

    if(currentPointerEvents.length == 2) {
        // two finger touch; update zoom level
        let pointerA = currentPointerEvents[0];
        let pointerB = currentPointerEvents[1];

        let distX = Math.abs(
            pointerA.clientX - pointerB.clientX
        );
        let distY = Math.abs(
            pointerA.clientY - pointerB.clientY
        );

        let currentZoomDiff = Math.sqrt(
            distX*distX + distY*distY
        );

        if(prevZoomDiff > 0) {
            diffOfDiffs = currentZoomDiff - 
                prevZoomDiff;
            scaleFactor = Math.max(
                0,
                scaleFactor +
                (diffOfDiffs * TWO_TOUCH_ZOOM_FACTOR)
            );
        }

        // update prevZoomDiff for next move event
        prevZoomDiff = currentZoomDiff;
    }

    pointerDebug();
}

function pointerupHandler(evt) {
    debug('pointerup');
    evt.preventDefault();

    removePointer(evt);

    if(dragStartEvt &&
        evt.pointerId == dragStartEvt.pointerId) {
        // stop dragging
        dragStartEvt = null;
        startingSunCoords = null;
    }

    if(currentPointerEvents.length < 2) {
        // stop zooming
        debug('clearingZoomDiff');
        currentZoomDiff = -1;
    }

    // for(const touch of evt.changedTouches) {

    //     let foundTouch = getCurrentTouchMatchingId(touch.identifier);

    //     if(foundTouch) {
    //         // debug('found touch ' +
    //         //     foundTouch.identifier);

    //         // temp hack: checking touch pos 
    //         // instead of finger time down to
    //         // guess if "tap" or "drag" happened
    //         const TAP_DIST_LIMIT = 10;

    //         let touchPos = calculateMousePos(touch);
    //         let foundTouchPos = calculateMousePos(foundTouch);

    //         let diffX = Math.abs(
    //             touchPos.x - foundTouchPos.x
    //         );
    //         let diffY = Math.abs(
    //             touchPos.y - foundTouchPos.y
    //         );

    //         // debug('diffX: '+diffX);
    //         // debug('diffY: '+diffY);

    //         if(diffX < TAP_DIST_LIMIT &&
    //             diffY < TAP_DIST_LIMIT) {
    //             selectedEntity = tryToSelectEntityAt(touchPos);
    //         }
    //     } else {
    //         // debug("no touch found");
    //     }

    //     // remove this touch from changedTouches
    //     currentPointerEvents = currentPointerEvents.filter(
    //         (t) => t.identifier !== touch.identifier
    //     );
    // }

    // if(currentPointerEvents.length < 2) {
    //     zooming = false;
    // }
    // if(currentPointerEvents.length < 1) {
    //     draggingTouchId = null;
    //     dragStartCoords = null;
    // }
    pointerDebug();
}


function pointercancelHandler(evt) {
    evt.preventDefault();
    debug('pointercancel');

    removePointer(evt);

    if(dragStartEvt &&
        evt.pointerId == dragStartEvt.pointerId) {
        cancelDragging();
    }

    if(currentPointerEvents.length < 2) {
        // stop zooming
        currentZoomDiff = -1;
    }
    pointerDebug();
}

function removePointer(evt) {
    debug("removePointer :" + evt.pointerId);
    console.log('before', currentPointerEvents);
    // backwards loop because we're deleting
    for(let i=currentPointerEvents.length - 1;i>=0;i--) {
        if(currentPointerEvents[i].pointerId ==
            evt.pointerId) {

            debug("found pointer to remove at idx: " +
                i);
            currentPointerEvents.splice(i, 1);
        }
    }
    console.log('after', currentPointerEvents);
     prevZoomDiff = -1;
}

// function mousedownHandler(evt) {
//     let mousePos = calculateMousePos(evt);
//     // debug('mousedown: (' +mousePos.x + ','+ mousePos.y + ')');
// }
// 
// function mouseupHandler(evt) {
//     // debug('mouseup: (' +mousePos.x + ','+ mousePos.y + ')');
// }

function keyupHandler(evt) {
    // any keyboard shortcuts can go here
}

function calculateMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;

    // account for the margins, canvas position on   page, scroll amount, etc.
    let mouseX = evt.clientX - rect.left - root.     scrollLeft;
    let mouseY = evt.clientY - rect.top - root.      scrollTop;
    // let mouseLevelX = mouseX + camPanX;
    // let mouseLevelY = mouseY + camPanY;
    //console.log( "x: "+ mouseX, "y: " + mouseY);
    return {
        x: mouseX,
        y: mouseY,
        // levelX: mouseLevelX,
        // levelY: mouseLevelY,
    };

}

function cancelDragging() {
    draggingTouchId = null;
    dragStartCoords = null;

    sun.x = startingSunCoords.x;
    sun.y = startingSunCoords.y;
}

function getCurrentTouchMatchingId(touchId) {
    // debugCurrentPointerEvents();
    return currentPointerEvents.find(touch => {
        return touch.identifier == touchId;
    })
}

function debugCurrentPointerEvents() {
    console.log('currentPointerEvents', 
        currentPointerEvents);
    debug('current touches: [' +
       currentPointerEvents.map(
           curTouch => curTouch.identifier
       ).join(',') +']');
    // JSON.stringify(currentPointerEvents));
}

function tryToSelectEntityAt(touchPos) {
    debug('trying to select entity at: ('+
        touchPos.x + ', ' + touchPos.y +')');

    const MAX_ENTITY_TAP_RADIUS = 20;

    let closestDistToTapFound = MAX_ENTITY_TAP_RADIUS;
    let closestEntity = null;

    for(const fleet of allFleets) {
        debug('checking fleet at: (' +
            fleet.x +', '+ fleet.y +')');
        let distFromTap = distBetween(touchPos, fleet);
        debug('dist from tap: ' + distFromTap);
        if( distFromTap <
            closestDistToTapFound ) {
            debug('new closest entity found');
            closestEntity = fleet;
            closestDistToTapFound = distFromTap;
        }
    }

    if(closestEntity) {
        debug('found one');
    } else {
        debug('could not find closest entity');
    }
    return closestEntity;
}

function distBetween(pointA, pointB) {
    if(!pointA.hasOwnProperty('x') ||
        !pointA.hasOwnProperty('y')) {
        console.error('Point A does not contain valid coordinate data!');
        console.log('Point A', pointA);
        return undefined;
    }
    if(!pointB.hasOwnProperty('x') ||
        !pointB.hasOwnProperty('y')) {
        console.error('Point B does not contain valid coordinate data!');
        console.log('Point B', pointB);
        return undefined;
    }

    var deltaX = pointA.x - pointB.x;
    var deltaY = pointA.y - pointB.y;
    return Math.sqrt(deltaX*deltaX + deltaY*    deltaY);

}

function pointerDebug() {
    if(pointerDebugMode) {
        let pointerDebugP = document.getElementById('pointerDebug');
        pointerDebugP.innerHTML = `
        pointer events: 
        ${currentPointerEvents.map(
        p => p.pointerId)} <br/>
        drag start pointer: ${dragStartEvt ?
        dragStartEvt.pointerId : dragStartEvt } <br/>
        prevZoomDiff: ${prevZoomDiff} <br/>
        scaleFactor: ${scaleFactor} <br/>
        `;
    }
}
