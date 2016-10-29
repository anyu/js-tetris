/***************************
MATRIX PROBLEMS:
- landed array and active array become the same. so collision is always true.
- active array not being wiped.
- active array - same color and shape for all pieces.
- rotation is weird.

CURRENT BUGS: 
1) O shape doesn't show in certain directions - length undefined error
2) Left bound keeps going invisibly offscreen - affects moving right 
3) Right bound not set
4) Bottom bound not complete

/***************************
NEXT:
- Make pieces stop on collision
- Once a row is filled, make it disappear
- End game when top is reached

/***************************/

var canvas = document.getElementById("grid");
var context = canvas.getContext("2d");

/***************************
Objects
/***************************/

var BLOCK_SIZE = 30;

var NUM_ROWS = 20;
var NUM_COLS = 10;

// not sure if necessary anymore
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

var collision = false;
var count = 0;

var tetrisPiece = function (gridRow, gridCol, fillColor, strokeColor) {

    this.posGridRow = 0;
    this.posGridCol = 0;
    this.potentialPosGridRow = 0;
    this.potentialPosGridCol = 0;
    // this.height = BLOCK_SIZE *3;
    // this.width = BLOCK_SIZE *2;
    this.height = 4;
    this.width = 4;
    this.shape = shapes[randomShape()];
    this.direction = randomDirection(this.shape);
    // this.shape = T;
    // this.direction = 0;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.visible = false;

    tetrisPiece.prototype.draw = function() {
        formBrick(this.shape, this.direction, this.posGridRow, this.posGridCol, this.fillColor, this.strokeColor);
    }
    
    // Loop through possible directions
    tetrisPiece.prototype.rotate = function() {
        if (this.direction + 1 > 3) {
            this.direction = 0;
        }
        else {
            this.direction += 1;
        }
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
Functions
/***************************/

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

function detectCollision(currentPiece) {
    for (var row = 0; row < currentPiece.shape[currentPiece.direction][0].length; row++) {
        for (var col = 0; col < currentPiece.shape[currentPiece.direction][0][0].length; col++) {

            console.log("row: " + row);
            console.log("col: " + col);
            console.log(currentPiece);

            if (currentPiece.shape[currentPiece.direction][row][col] == 1 ) {
                if (landed[currentPiece.potentialPosGridRow + row] == 1 && 
                    landed[currentPiece.potentialPosGridCol + col] == 1) {
                    collision = true;
                }               
            }
        }
    }
}

function formBrick(shape, direction, gridRow, gridCol,fillColor, strokeColor) {
    var gridRowOrig = gridRow;
    var gridColOrig = gridCol;

    for (var row = 0; row < shape.length; row++) {
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

        // reset to first column
        gridCol = gridColOrig;
        gridRow++;
    }
}

function storeInLanded(shape, direction, gridRow, gridCol, fillColor, strokeColor) {
    var gridRowOrig = gridRow;
    var gridColOrig = gridCol;

    for (var row = 0; row < shape.length; row++) {
        for (var col = 0; col < shape[direction].length; col++) { 

            if ((shape[direction][row][col]) == 1 ) {
                landed[gridRow][gridCol] = 1;
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

        // reset to first column
        gridCol = gridColOrig;
        gridRow++;
    }
    console.log("landed: " + landed);
}

var tetrisPiece1 = new tetrisPiece(randNumberWithMultiple(0, GRIDWIDTH, BLOCK_SIZE),0,'#66999B','#1E8C91');
var tetrisPiece2 = new tetrisPiece(randNumberWithMultiple(0, GRIDWIDTH, BLOCK_SIZE),0,'#F5A623','#D08916');
// var tetrisPiece3 = new tetrisPiece(randNumberWithMultiple(0, GRIDWIDTH, BLOCK_SIZE),0,'#FA4E4E','#DD4646');

var piecesArray = [];
piecesArray.push(tetrisPiece1);
piecesArray.push(tetrisPiece2);
// piecesArray.push(tetrisPiece3);

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
                detectCollision(piecesArray[j]);
                piecesArray[j].draw(piecesArray[j].posGridRow, piecesArray[j].posGridCol);
            }
        }
    }    

    var dropPiece = function(piece) {
        piece.visible = true;
        piece.posGridRow++; 

        setPiece(piece);
    }

    var setPiece = function(currentPiece) {

        if (currentPiece.posGridRow >= (NUM_ROWS - currentPiece.height)) { 
            count++;

            storeInLanded(currentPiece.shape,currentPiece.direction, currentPiece.posGridRow,currentPiece.posGridCol, currentPiece.fillColor, currentPiece.strokeColor);

            if (count < piecesArray.length) {
                dropPiece(piecesArray[count]);
            }
            else {
                endGame();
            }
        }
    }

    function endGame() {
        clearInterval(gameLoop);
    };

    function newGame() {
        gameLoop = setInterval(game, 350);            
    }

    addEventListener( "keydown", function(e) {    

    // A moves left
    // if(e.keyCode == 65 && !hitLeftEdge) {
    if(e.keyCode == 65) {
        piecesArray[count].posGridCol -= 1;
    }

    // D moves right
    if(e.keyCode == 68) {
        piecesArray[count].posGridCol++;
        // hitLeftEdge = false;
    }

    // S speeds down
    if(e.keyCode == 83) {
        piecesArray[count].posGridRow++;
    }

    // R rotates
    if(e.keyCode == 82) {
        piecesArray[count].rotate();
    }

});

    newGame();
}

init();
