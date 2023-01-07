initCanvas = () => {


    let cx1 = windowWidth / 2 - size;
    let cx2 = windowWidth / 2 + cell_size;
    let cy = (windowHeight / 2) - (size/2);

    captureCanvas = {
        x: cx1,
        y: cy,
        w: size,
        h: size,
        cell_size: cell_size,
        zoom: null // value of html slider
    }

    imgCanvas = {
        x: cx2,
        y: cy,
        w: size,
        h: size,
        cell_size: cell_size
    }

    outputCanvas = {
        x: size + cell_size,
        y: 0,
        w: size,
        h: size,
        cell_size: cell_size
    }

}