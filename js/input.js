const TWO_TOUCH_ZOOM_FACTOR = 0.01;
const MAX_ENTITY_TAP_RADIUS = 20;
const MIN_DIST_TO_COUNT_DRAG = 10;
const MIN_SCALE_FACTOR = 0.5;
const MAX_SCALE_FACTOR = 2.5;
const MOUSEWHEEL_ZOOM_INCREMENT = 0.5;

// var draggingTouchId = null;
var dragStartEvt = null;
var startingSunCoords = null;
var prevZoomDiff = -1;
// var zooming = false;
var currentPointerEvents = [];

function setupInput() {
    canvas.addEventListener('wheel', mouseWheelHandler);
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

    // let scaleFactorInput = document.getElementById('scaleFactorInput');
    // scaleFactorInput.addEventListener('input',
    //     (evt) => {
    //         scaleFactor = Math.max( 0, evt.target.value / 50 );
    //         // never go less than 0 or map drawing math breaks
    //     });
}

// The question here is, are we:
// 1. dragging the map around?
//  - one pointer with movement
// 2. pinching to zoom?
//  - two pointers moving closer or further apart
// 3. tapping to select a planet?
//  - one pointer down/up ~quickly~ without movement

function pointerdownHandler(evt) {
    evt.preventDefault();
    console.log('pointerdown');
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
    console.log('pointermove');
    
    // update currentPointerEvents with new coords
    for(let i=0;i<currentPointerEvents.length;i++) {
        
        if(currentPointerEvents[i].pointerId ==
            evt.pointerId) {

            currentPointerEvents[i] = evt;
            break;
        }
    }

    if(dragStartEvt && evt.pointerId == dragStartEvt.pointerId) {
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

            let newScaleFactor = scaleFactor +
                (diffOfDiffs * TWO_TOUCH_ZOOM_FACTOR);

            // apply min/max constraints
            newScaleFactor = Math.max(
                MIN_SCALE_FACTOR,
                newScaleFactor
            );

            newScaleFactor = Math.min(
                MAX_SCALE_FACTOR,
                newScaleFactor
            );

            scaleFactor = newScaleFactor;
        }

        // update prevZoomDiff for next move event
        prevZoomDiff = currentZoomDiff;
    }

    pointerDebug();
}

function pointerupHandler(evt) {
    console.log('pointerup');
    evt.preventDefault();

    // check if this was a tap
    if(dragStartEvt) {
        let diffX = evt.clientX - dragStartEvt.clientX;
        let diffY = evt.clientY - dragStartEvt.clientY;

        if(Math.abs(diffX) < MIN_DIST_TO_COUNT_DRAG &&
            Math.abs(diffY) < MIN_DIST_TO_COUNT_DRAG) {

            // we're in a tap, do tappy things
            handleTap(evt);
        }
    }


    // check if we need to stop dragging
    if(dragStartEvt &&
        evt.pointerId == dragStartEvt.pointerId) {
        // stop dragging
        dragStartEvt = null;
        startingSunCoords = null;
    }

    removePointer(evt);

    if(currentPointerEvents.length < 2) {
        // stop zooming
        console.log('clearingZoomDiff');
        currentZoomDiff = -1;
    }

    // for(const touch of evt.changedTouches) {

    //     let foundTouch = getCurrentTouchMatchingId(touch.identifier);

    //     if(foundTouch) {
    //         // console.log('found touch ' +
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

    //         // console.log('diffX: '+diffX);
    //         // console.log('diffY: '+diffY);

    //         if(diffX < TAP_DIST_LIMIT &&
    //             diffY < TAP_DIST_LIMIT) {
    //             selectedEntity = tryToSelectEntityAt(touchPos);
    //         }
    //     } else {
    //         // console.log("no touch found");
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
    console.log('pointercancel');

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
    console.log("removePointer :" + evt.pointerId);
    console.log('before', currentPointerEvents);
    // backwards loop because we're deleting
    for(let i=currentPointerEvents.length - 1;i>=0;i--) {
        if(currentPointerEvents[i].pointerId ==
            evt.pointerId) {

            console.log("found pointer to remove at idx: " +
                i);
            currentPointerEvents.splice(i, 1);
        }
    }
    console.log('after', currentPointerEvents);
    prevZoomDiff = -1;
}

// function mousedownHandler(evt) {
//     let mousePos = calculateMousePos(evt);
//     // console.log('mousedown: (' +mousePos.x + ','+ mousePos.y + ')');
// }
// 
// function mouseupHandler(evt) {
//     // console.log('mouseup: (' +mousePos.x + ','+ mousePos.y + ')');
// }

function keyupHandler(evt) {
    // any keyboard shortcuts can go here
}

function handleTap(evt) {
    let touchPos = calculateMousePos(evt);

    if(!selectedEntity) {
        selectedEntity = tryToSelectEntityAt(touchPos);
        return;
    } else {
        // TODO after fleet class refactor
        // if(typeof selectedEntity == 'fleet' ) {
        targetStep = stepClosestTo(touchPos);

        // }
    }


}

function calculateMousePos(evt) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;

    // account for the margins, canvas position on
    // page, scroll amount, etc.
    let mouseX = evt.clientX - rect.left - 
        root.scrollLeft;
    let mouseY = evt.clientY - rect.top - 
        root.scrollTop;
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
    console.log('current touches: [' +
       currentPointerEvents.map(
           curTouch => curTouch.identifier
       ).join(',') +']');
    // JSON.stringify(currentPointerEvents));
}

function tryToSelectEntityAt(touchPos) {
    console.log('trying to select entity at: ('+
        touchPos.x + ', ' + touchPos.y +')');

    let closestDistToTapFound = MAX_ENTITY_TAP_RADIUS;
    let closestEntity = null;

    for(const fleet of allFleets) {
        console.log('checking fleet at: (' +
            fleet.x +', '+ fleet.y +')');
        let fleetStep = getFleetStep(fleet);
        let distFromTap = distBetween(touchPos, fleetStep);
        console.log('dist from tap: ' + distFromTap);
        if( distFromTap <
            closestDistToTapFound ) {
            console.log('new closest entity found');
            closestEntity = fleet;
            closestDistToTapFound = distFromTap;
        }
    }

    if(closestEntity) {
        console.log('found one');
    } else {
        console.log('could not find closest entity');
    }
    return closestEntity;
}

function stepClosestTo(touchPos) {
    let closestDistToTapFound = MAX_ENTITY_TAP_RADIUS;
    let closestStep = null;

    console.log("TODO");
    for(const orbit of orbits) {
        for(let i = 0; i < orbit.stepCount; i++) {
            // CRUD! I need to refactor to have access
            // to step coords on-demand. This means
            // putting step arrays & x/y coords and
            // using the moveOrbits() function

            // let distFromTap = distBetween(touchPos, fleet);

            // if( distFromTap < closestDistToTapFound ) {
            //     closestStep = fleet;
            //     closestDistToTapFound = distFromTap;
            // }
        }
    }

    return closestStep;
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
    if(gameOptions.showPointerDebugInfo) {
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

function mouseWheelHandler(evt) {
    // console.log("this mouse wheel event just fired:",evt);
    // to prevent default browser scrolling behavior:
    // evt.preventDefault(); 

    let newScaleFactor = scaleFactor;

    if (evt.deltaY < 0) { // scroll up
        newScaleFactor += MOUSEWHEEL_ZOOM_INCREMENT;
    } else if (evt.deltaY > 0) { // scroll down
        newScaleFactor -= MOUSEWHEEL_ZOOM_INCREMENT;
    }

    // apply min/max constraints
    newScaleFactor = Math.max(
        MIN_SCALE_FACTOR,
        newScaleFactor
    );

    newScaleFactor = Math.min(
        MAX_SCALE_FACTOR,
        newScaleFactor
    );

    // TODO: ensure this does not interfere with touchscreen pinch zoom
    scaleFactor = newScaleFactor;

}

