    // purple: #A951C6
    // amarelo: #FFBC02
    // laranja: #FF9A01
    // azul agua: #00A2C7
    // azul escuro: #004BD7
    // light-green: #90AF00

    loadTrackingColors = () => {
        // tracking.ColorTracker.registerColor('purple', function (r, g, b) {
        //     var dx = r - 169;
        //     var dy = g - 81;
        //     var dz = b - 198;

        //     if ((b - g) >= 100 && (r - g) >= 60) {
        //         return true;
        //     }
        //     return dx * dx + dy * dy + dz * dz < 3500;
        // });

        // tracking.ColorTracker.registerColor('light-green', function (r, g, b) {
        //     var dx = r - 144;
        //     var dy = g - 175;
        //     var dz = b - 0;

        //     if ((b - g) >= 100 && (r - g) >= 60) {
        //         return true;
        //     }
        //     return dx * dx + dy * dy + dz * dz < 3500;
        // });

    tracking.ColorTracker.registerColor('cyan', function (r, g, b) {
        var thresholdGreen = 50,
            thresholdBlue = 70,
            dx = r - 0,
            dy = g - 255,
            dz = b - 255;
        if ((g - r) >= thresholdGreen && (b - r) >= thresholdBlue) {
            return true;
        }
        return dx * dx + dy * dy + dz * dz < 6400;
    });

    tracking.ColorTracker.registerColor('magenta', function (r, g, b) {
        var threshold = 50,
            dx = r - 255,
            dy = g - 0,
            dz = b - 255;
        if ((r - g) >= threshold && (b - g) >= threshold) {
            return true;
        }
        return dx * dx + dy * dy + dz * dz < 19600;
    });

    tracking.ColorTracker.registerColor('yellow', function (r, g, b) {
        var threshold = 50,
            dx = r - 255,
            dy = g - 255,
            dz = b - 0;
        if ((r - b) >= threshold && (g - b) >= threshold) {
            return true;
        }
        return dx * dx + dy * dy + dz * dz < 10000;
    });


    tracking.ColorTracker.registerColor('red', function (r, g, b) {
        var thresholdRed = 50,
            dx = r - 255,
            dy = g - 0,
            dz = b - 0;
        if ((r - g) >= thresholdRed && (r - b) >= thresholdRed) {
            return true;
        }
        return dx * dx + dy * dy + dz * dz < 6400;
    });

    tracking.ColorTracker.registerColor('green', function (r, g, b) {
        var thresholdGreen = 50,
            dx = r - 0,
            dy = g - 255,
            dz = b - 0;
        if ((g - r) >= thresholdGreen && (g - b) >= thresholdGreen) {
            return true;
        }
        return dx * dx + dy * dy + dz * dz < 6400;
    });

    tracking.ColorTracker.registerColor('blue', function (r, g, b) {
        var thresholdBlue = 50,
            dx = r - 0,
            dy = g - 0,
            dz = b - 255;
        if ((b - r) >= thresholdBlue && (b - g) >= thresholdBlue) {
            return true;
        }
        return dx * dx + dy * dy + dz * dz < 6400;
    });


    tracking.ColorTracker.registerColor('purple', function (r, g, b) {
        var dx = r - 120;
        var dy = g - 60;
        var dz = b - 210;

        if ((b - g) >= 100 && (r - g) >= 60) {
            return true;
        }
        return dx * dx + dy * dy + dz * dz < 3500;
    });

}


