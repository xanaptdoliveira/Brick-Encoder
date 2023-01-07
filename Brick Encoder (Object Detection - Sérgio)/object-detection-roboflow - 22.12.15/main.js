/**
 * @file Object Detection with P5js and Roboflow
 * @author Sérgio M. Rebelo <srebelo@dei.uc.pt>
 *
 * Reference Roboflow Web API
 * https://docs.roboflow.com/inference/web-browser
 */

let model = null;
let status = false;
let img = null, canvasImg = null;

let capture = null;

preload = () => {
    console.log(`👋`);

    // load image
    // img = createImg('15.png');
    // canvasImg = loadImage('15.png');

    // load roboflow model
    roboflow.auth({
        publishable_key: "rf_XGla39KM9Oc7DEHxuVQ311lcyvw2"
    }).load({
        //model: "testing-multi-label-classification",
        model: "ldc-lego-yolo",
        version: 1
    }).then(function(_model) {
        model = _model;
        status = true;
        // model has loaded!
        model.configure({
            threshold: 0.5,
            overlap: 0.1,
            max_objects: 20
        });
    });
}

setup = () => {
    createCanvas(windowWidth, 500);

    // -- display image
    // img.position(img, 0, 0);
    // img.size(500,500);
    // img.hide();
    // canvasImg.resize(500,500);



    // -- display capture
    capture = createCapture(VIDEO);
    /// capture.size(500, 500);
    capture.hide();

    tSlider = createSlider(0.0, 1.0, 0.5, 0.05);
    tSlider.position(700, 20);
    oSlider = createSlider(0.0, 1.0, 0.1, 0.05);
    oSlider.position(700, 40);
    mSlider = createSlider(1, 100, 20, 1);
    mSlider.position(700, 60);

    tSlider.input(updateModelConfig);
    oSlider.input(updateModelConfig);
    mSlider.input(updateModelConfig);

}

draw = () => {
    if (!status) return;

    background(255);

    // display image
    // image(canvasImg, 0, 0, img.width, img.height);

    // display capture
    image(capture, 0, 0);

    // load image on model
    // const el = document.querySelector('img');

    // load capture on model
    const el = document.querySelector('video');

    model.detect(el).then(function(predictions) {
        // console.log("Predictions:", predictions);
        for (let pred of predictions) {
            display(pred);
        }
    });

}

// draw bounding boxes
display = (pred) => {
    push();
    rectMode(CENTER);
    stroke(pred.color);
    noFill();
    strokeWeight (5);
    rect(pred.bbox.x,pred.bbox.y,pred.bbox.width,pred.bbox.height);
    fill(pred.color);
    noStroke();
    text (
        `${pred.class} ${pred.color} (c. ${Math.round(pred.confidence * 10) / 10})`,
        (pred.bbox.x + pred.bbox.width + 10),
        (pred.bbox.y),
        )
    pop();
}


updateModelConfig = () => {

    const t = tSlider.value();
    const o = oSlider.value();
    const m = mSlider.value();
    
        fill(0);
        text('threshold:' + t , 900, 20);
        text('overlap: ' + o, 900, 40);
        text('max_objects: ' + m, 900, 60);
    
    model.configure({
        threshold: t,
        overlap: o,
        max_objects: m
    });

}

