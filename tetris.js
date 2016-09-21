var canvas = document.getElementById("grid");
var context = canvas.getContext("2d");


/***************************
Objects
/***************************/

var x = 50;
var y = 50;
var piece = new Image();
piece.onload = start;
piece.src = "shapeT.png";

function background() {
    context.beginPath();
    context.rect(0, 0, 400, 600);
    context.lineWidth = 3;
    context.strokeStyle = '#dddddd';
    context.stroke();
}

/***************************
Game start
/***************************/

function start() {
    initiate();
}

function initiate() {
    requestAnimationFrame(initiate);
    y += 2;
    context.clearRect(0,0,canvas.width,canvas.height);
    background();

    if (piece.y < 600) {
        context.drawImage(piece,x,y);
    }
}

