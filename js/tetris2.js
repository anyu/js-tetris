var canvas = document.getElementById("grid");
var context = canvas.getContext("2d");

var BLOCK_SIZE = 30;

var NUM_ROWS = 20;
var NUM_COLS = 10;

var GRIDWIDTH = BLOCK_SIZE * 10;
var GRIDHEIGHT = BLOCK_SIZE * 20;

var shapes = [I,J,L,O,S,T,Z];

var landed = [];

for (var i = 0; i< NUM_ROWS;i ++) {
    landed[i] = new Array();
    for (j = 0; j < NUM_COLS;j++) {
        landed[i][j] = 0;
    }
}


function drawBackground(){
    for (var x = 0; x <= GRIDWIDTH; x += BLOCK_SIZE) {
        context.moveTo(x, 0);
        context.lineTo(x, GRIDHEIGHT);
    }
    for (var x = 0; x <= GRIDHEIGHT; x += BLOCK_SIZE) {
        context.moveTo(0, x);
        context.lineTo(GRIDWIDTH, x);
    }
    context.strokeStyle = "#EEEEEE";
    context.stroke();
}









/***************************
Game start
/***************************/

function init() {

    var game = function() {
        draw();
    }

    var draw = function() {        
        context.clearRect(0, 0, canvas.width, canvas.height);
		drawBackground();
    }    

    function endGame() {
        clearInterval(gameLoop);
    };

    function newGame() {
        gameLoop = setInterval(game, 350);            
    }

    newGame();
}

init();
