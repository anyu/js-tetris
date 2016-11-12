var canvas = document.getElementById("grid");
var context = canvas.getContext("2d");

var BLOCK_SIZE = 30;

var NUM_ROWS = 20;
var NUM_COLS = 10;

var GRIDWIDTH = BLOCK_SIZE * 10;
var GRIDHEIGHT = BLOCK_SIZE * 20;

var count = 0;

var shapes = [I,J,L,O,S,T,Z];
var landed = [];

// create empty matrix filled with 0's
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

var tetrisPiece = function(gridRow, gridCol, fillColor, strokeColor) {
	this.gridRow = gridRow;
	this.gridCol = gridCol,
	this.shape = shapes[randomShape()];
    this.direction = randomDirection(this.shape);
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.visible = false;

    tetrisPiece.prototype.draw = function() {
        formBrick(this.shape, this.direction, this.gridRow, this.gridCol, this.fillColor, this.strokeColor);
    }

}

function formBrick(shape, direction, gridRow, gridCol,fillColor, strokeColor) {
    var gridRowOrig = gridRow;
    var gridColOrig = gridCol;

    for (var row = 0; row < shape[direction][0].length; row++) {
    	for (var col = 0; col < shape[direction].length; col++) { 
    	    if (shape[direction][row][col] == 1) {	
    	    	context.beginPath();
                context.rect(gridCol*BLOCK_SIZE, gridRow*BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                context.lineWidth = 1;
                context.fillStyle = fillColor;
                context.strokeStyle = strokeColor;
                context.fill();
                context.stroke();
			}
			gridCol++;
    	}
	}	

    // reset to first column
    gridCol = gridColOrig;
    gridRow++;

}

// Helper methods

function randomShape() {
    var result = Math.floor(Math.random() * shapes.length);
    return result;
} 

function randomDirection(shape) {
    var result = Math.floor(Math.random() * shape.length)
    return result;
} 

function randNumberWithMultiple(min, max, multiple) {
    var result = Math.floor(Math.random() * ((max - min) / multiple)) * BLOCK_SIZE + min;
    return result;
}


var tetrisPiece1 = new tetrisPiece(randNumberWithMultiple(0, GRIDWIDTH, BLOCK_SIZE),0,'#66999B','#1E8C91');
var tetrisPiece2 = new tetrisPiece(randNumberWithMultiple(0, GRIDWIDTH, BLOCK_SIZE),0,'#F5A623','#D08916');

var piecesArray = [];
piecesArray.push(tetrisPiece1);
piecesArray.push(tetrisPiece2);

/***************************
Game start
/***************************/

function init() {

    var game = function() {
        draw();
    }

    var draw = function() {   

        context.clearRect(0, 0, canvas.width, canvas.height);

        dropPiece(piecesArray[count]);
		drawBackground();

		for (var j = 0; j < piecesArray.length; j++) {
            if (piecesArray[j].visible) {  
                piecesArray[j].draw(piecesArray[j].gridRow, piecesArray[j].gridCol);
            }
        }
    }    

    var dropPiece = function(piece) {
        piece.visible = true;
        piece.gridRow++; 
        // setPiece(piece);
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
