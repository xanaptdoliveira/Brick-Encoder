/**
 * @file Name of File
 * @author Alexandra Oliveira <apoliveira@student.dei.uc.pt>
 *
 */

let img = null,
    capture0 = null,
    capture = null;

let captureCanvas, imgCanvas;
let cx, cy;
let size = 500; // the size of both canvases (they are both squares);
let cell_size; // the size of each cell, according to the size of the canvas;
let n_cells = 32;

// State = 0 --- Detecting bricks
// State = 1 --- Saves bricks
// State = 2 --- agents go crazy
let state = 0;
let grids = false;
let showCam = false;

let track = false;


var trackingData;
var colors;

let ox, oy, ow, oh;
let newCanvasWidth, newCanvasHeight;


preload = () => {
    cell_size = round(size / n_cells);

    initCanvas(); // centers canvas on screen

    // -- image
    img = loadImage('img/0-min.png');
}

setup = () => {
    createCanvas(windowWidth, windowHeight);

    // -- image
    img.resize(imgCanvas.w, imgCanvas.h);

    // -- capture
    capture0 = createCapture({
        audio: false,
        video: {
            width: captureCanvas.w - cell_size,
            height: captureCanvas.h - cell_size
        }
    }, function () {
        console.log('capture ready!')
    });
    //capture0.hide(); // capture is a resized copy of capture0
    capture = createImage(captureCanvas.w, captureCanvas.h);
    displayCapture();

    // Add colors to color tracker
    loadTrackingColors();

    capture0.class("myVideo"); //give the capture an ID so we can use it in the tracker below.
    //colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow', 'purple', 'light-green', 'red']);
    colors = new tracking.ColorTracker(['magenta', 'cyan', 'yellow', 'red', 'green', 'blue', 'purple']);

    tracking.track('.myVideo', colors); // start the tracking of the colors above on the camera in p5


    //start detecting the tracking
    colors.on('track', function (event) { //this happens each time the tracking happens
        trackingData = event.data // break the trackingjs data into a global so we can access it with p5
    });

    // -- slider for zoom
    zoomCaptureSlider = select('#slider-zoom');
    zoomCaptureSlider.input(updateZoom);
    updateZoom();
}

draw = () => {
    background(10);

    displayCapture();
    // displayImage();

    if (grids == true) {
        drawGrid(captureCanvas.x, captureCanvas.y,
            captureCanvas.cell_size, n_cells,
            color(255, 50));

        drawGrid(imgCanvas.x, imgCanvas.y,
            imgCanvas.cell_size, n_cells,
            color(255, 50));
    }
}

// -- draw capture
displayCapture = () => {

    // Copy video capture to capture (for resize)
    capture.copy(capture0,
        0, 0,
        captureCanvas.w, captureCanvas.h,
        0, 0,
        newCanvasWidth, newCanvasHeight);

    pixelize(capture,
        captureCanvas.x, captureCanvas.y,
        captureCanvas.w, captureCanvas.h,
        captureCanvas.cell_size);

    // Display Capture
    if (showCam == true) image(capture,
        captureCanvas.x + captureCanvas.cell_size,
        captureCanvas.y + captureCanvas.cell_size);

    // Track Colors
    if (track == true) trackBricks(captureCanvas);
    if (track == true) trackBricks(imgCanvas);

}


trackBricks = (canvas) => {
    push();
    // console.log(trackingData);
    if (trackingData) { //if there is tracking data to look at, then...
        for (var i = 0; i < trackingData.length; i++) { //loop through each of the detected colors
            // console.log( trackingData[i] )
            
                let snapXtogrid = map(
                    trackingData[i].x - canvas.x,
                    0, n_cells * canvas.cell_size  - (canvas.cell_size/2),
                    0, n_cells
                );
                trackingData[i].x = canvas.x - (canvas.cell_size/2) + int(snapXtogrid) * canvas.cell_size;

                let snapYtogrid = map(
                    trackingData[i].y - canvas.y,
                    0, n_cells * canvas.cell_size,
                    0, n_cells
                );
                trackingData[i].y = canvas.y + int(snapYtogrid) * canvas.cell_size;

                let snapWtogrid = map(
                    trackingData[i].width - canvas.w,
                    0, n_cells * canvas.cell_size,
                    0, n_cells
                );
                trackingData[i].width = canvas.w + int(snapWtogrid) * canvas.cell_size;

                let snapHtogrid = map(
                    trackingData[i].height - canvas.h,
                    0, n_cells * canvas.cell_size,
                    0, n_cells
                );
                trackingData[i].height = canvas.h + int(snapHtogrid) * canvas.cell_size;

                ox = ((canvas.x + trackingData[i].x) * (canvas.x + newCanvasWidth)) / (canvas.x + canvas.w);
                oy = ((canvas.y + trackingData[i].y) * (canvas.y + newCanvasHeight)) / (canvas.y + canvas.h);
                ow = (trackingData[i].width * (newCanvasWidth)) / canvas.w;
                oh = (trackingData[i].height * (newCanvasHeight)) / canvas.h;

                let c = color(trackingData[i].color);
                strokeWeight(3);
                stroke(c);
                c.setAlpha(150);
                fill(c);
                rect(ox, oy, ow, oh)
                // rect(trackingData[i].x, trackingData[i].y, trackingData[i].width, trackingData[i].height)
        }
    }
    pop();
    console.log("ox: " + ox);
    console.log("oy: " + oy);

}


// -- draw img
displayImage = () => {
    pixelize(img,
        imgCanvas.x, imgCanvas.y,
        imgCanvas.w, imgCanvas.h,
        imgCanvas.cell_size);

    // Display Image if needed
    if (showCam == true) image(img, imgCanvas.x + imgCanvas.cell_size, imgCanvas.y + imgCanvas.cell_size, imgCanvas.w, imgCanvas.h);
    // image(img, imgCanvas.x, imgCanvas.y, imgCanvas.w, imgCanvas.h);

}

drawGrid = (x, y, cell_size, n_cells, color) => {
    push();
    stroke(color);
    for (let i = 0; i < n_cells - 1; i++) {
        for (let j = 0; j < n_cells - 1; j++) {
            noFill();
            rect(x + (i * cell_size + (cell_size/2)),
                y + (j * cell_size + (cell_size/2)),
                cell_size
            );
        }
    }
    pop();
}

// -- pixelize img
pixelize = (img, x, y, w, h, cell_size) => {
    push();
    img.loadPixels();
    //console.log(pixels[0], pixels[1], pixels[2]);
    for (let px = 0; px < w - cell_size; px += cell_size) {
        for (let py = 0; py < h - cell_size; py += cell_size) {
            let loc = (px + py * w) * 4;

            let r = img.pixels[loc + 0];
            let g = img.pixels[loc + 1];
            let b = img.pixels[loc + 2];

            fill(r, g, b);
            noStroke();
            rect(px + x + (cell_size/2), py + y + (cell_size/2), cell_size, cell_size);
        }
    }
    img.updatePixels();
    pop();
}

updateZoom = () => {
    push();
    const s1 = zoomCaptureSlider.value();
    captureCanvas.zoom = s1;
    let zoom_label = document.getElementById("slider-zoom-val");
    zoom_label.innerHTML = s1;
    pop();

    newCanvasWidth = captureCanvas.w + s1 + captureCanvas.cell_size;
    newCanvasHeight = captureCanvas.h + s1 + captureCanvas.cell_size;
}


// send them away
displayOutput = (x, y, w, h, color) => {

    // a place to display the outputs
    fill(color);
    rect(x, y, w, h);

}

windowResized = () => {
    resizeCanvas(windowWidth, windowHeight);
    initCanvas();
}