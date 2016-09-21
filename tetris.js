var canvas = document.getElementById("grid");
var context = canvas.getContext("2d");

function background() {
    context.beginPath();
    context.rect(0, 0, 400, 600);
    context.lineWidth = 3;
    context.strokeStyle = '#dddddd';
    context.stroke();
}

var x = 50;
var y = 50;
var piece = new Image();
piece.onload = start;
piece.src = "donut.png";

function start() {
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    y += 5;
    context.clearRect(0,0,canvas.width,canvas.height);
    background();
    context.drawImage(piece,x,y,100,100);
}

