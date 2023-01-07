keyPressed = () => {
    if (key == "c") {
        console.log("show cam");

        showCam = !showCam;
        console.log("cam: " + grids);
        let cam_label = document.getElementById("cam-label");
        if(showCam == true) cam_label.innerHTML = "c: hide cam";
        if(showCam == false) cam_label.innerHTML = "c: show cam";
    }

    if (key == "g") {
        console.log("show / hide grid");
        grids = !grids;
        console.log("grid: " + grids);
        let grid_label = document.getElementById("grid-label");
        if(grids == true) grid_label.innerHTML = "g: hide grid";
        if(grids == false) grid_label.innerHTML = "g: show grid";
    }

    if (key == "t") {
        console.log("start / stop tracking");
        track = !track;
        console.log("track: " + track);
        let track_label = document.getElementById("track-label");
        if(track == true) track_label.innerHTML = "t: stop track";
        if(track == false) track_label.innerHTML = "t: start track";
    }

    if (key == "s") {
        console.log("send them away");
    }
}
