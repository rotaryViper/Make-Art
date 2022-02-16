var onScreen = document.getElementById('onScreen');
var res = onScreen.width = onScreen.height = screen.width;
var onScreenContext = onScreen.getContext('2d');

function createOffscreenCanvas() {
    var canvas = document.createElement('canvas');
    canvas.width = canvas.height = screen.width;
    return canvas; //return canvas element
}

function fill(){
    offScreenCanvas = createOffscreenCanvas();
    var ctx = offScreenCanvas.getContext("2d");
    ctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
    ctx.fillRect(0, 0, res, res);
    return offScreenCanvas;
}

function lines(){
    offScreenCanvas = createOffscreenCanvas();
    var ctx = offScreenCanvas.getContext("2d");
    for (let i = 0; i!=300; i++){

        ctx.strokeStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
        ctx.font = (Math.random()*res/4)+'px Arial';

        //Calculate angle, scale and rotate
        angle = Math.random()*360;
        scale = Math.cos(angle);
        rotate = Math.sin(angle);

        //Give each letter it's own angle and location
        //x scale, x skew, y skew, y scale, x pos, y pos
        ctx.setTransform(scale,rotate,-rotate,scale,Math.random()*res,Math.random()*res);

        //Render text, and create unicode for text
        //ansi = String.fromCharCode(Math.floor(Math.random()*96)+32);
        //randomChar = String.fromCharCode(~~(Math.random()*1000000)); //Unicode 14 only goes up to 144,697. Unicode has a hard limit of 1,114,128.
        ctx.strokeText(String.fromCharCode(~~(Math.random()*1e16)), 0, 0);

        //Reset transformations
        ctx.setTransform(1,0,0,1,0,0)
    }
    return offScreenCanvas;
}

function copyToOnScreen(offScreenCanvas) {
    onScreenContext.drawImage(offScreenCanvas, 0, 0);
}

function main() {
    copyToOnScreen(fill());
    copyToOnScreen(lines());
}