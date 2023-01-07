function keyPressed() {

    if (keyCode === 83) { // if "s" is pressed
        saveForPrint("sketch.jpg", "A2", 300);
        /*saveForPrint("sketch.jpg", "A3", 300, 10); // save 10 frames*/
    }

    if (key == "m") {
        state = (state + 1) % n_drawing_modes;
    }

    if (key == "n") {
        addNewBrick();
    }

    //IMAGE AND COLOR
    if (key == "c") {
        mode = ((mode + 1) % imgs.length);
        if (mode == 0) mode = 1;
        c = colors[mode];
        c_name = color_names[mode];
    }

    // LARGURA
    if (keyCode === LEFT_ARROW) { // diminui altura
        if (w_mode > 1 && w_mode <= myBrickTemplate.maxW) {
            w_mode--;
        }
    }

    if (keyCode === RIGHT_ARROW) { // aumenta altura
        if (w_mode > 0 && w_mode < myBrickTemplate.maxW) {
            w_mode++;
        }
    }


    if (key == "r") { // ROTATE FALTA
        for (var i = 0; i < bricks.length; i++) {
            bricks[i].snapToGrid();
        }
    }

    // ALTURA
    if (keyCode === UP_ARROW) { // diminui altura
        if (h_mode > 1 && h_mode <= myBrickTemplate.maxH) {
            h_mode--;
        }
    }

    if (keyCode === DOWN_ARROW) { // aumenta altura
        if (h_mode > 0 && h_mode < myBrickTemplate.maxH) {
            h_mode++;
        }
    }

}