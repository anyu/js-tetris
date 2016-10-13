/***************************
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
var GRIDWIDTH = BLOCK_SIZE * 13;
var GRIDHEIGHT = BLOCK_SIZE * 20;

var shapes = [I,J,L,O,S,T,Z];
// var landed = new Array (GRIDHEIGHT).fill(new Array(GRIDWIDTH).fill('0'));

/***************************
Testing with simple case
/***************************/

var sample = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
];

var landed = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 0, 0],
];

var active = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 0, 0],
];

// for (var row = 0; row < landed[0].length; row++) {
//     for (var col = 0; col < landed[0].length; col++) {
//         if (landed[row][col] == active[row][col]) {
//             console.log("MAYDAY");
//         }
//     }
// }

// keep track of where in grid array we
var posGridRow = 0;
var posGridCol = 0;

var i = 0;
// var hitLeftEdge = false;
// var hitRightEdge = false;


var tetrisPiece = function (gridRow, gridCol, fillColor, strokeColor) {

    this.posGridRow = 0;
    this.posGridCol = gridCol;
    this.height = BLOCK_SIZE *3;
    this.width = BLOCK_SIZE *2;
    // this.shape = shapes[randomShape()];
    // this.direction = randomDirection();
    this.shape = O;
    this.direction = 0;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.visible = false;

    tetrisPiece.prototype.draw = function() {
        formBrick(this.shape, this.direction, this.posGridRow, this.posGridCol);
        drawBrick(this.fillColor, this.strokeColor);
    }
    
    // Loop through possible directions
    tetrisPiece.prototype.rotate = function() {
        if (this.direction+1 > 3) {
            this.direction = 0;
        }
        else {
            this.direction += 1;
        }
    }

}

function drawBackground(){
    for (var x = 0; x <= GRIDWIDTH; x += 30) {
        context.moveTo(x, 0);
        context.lineTo(x, GRIDHEIGHT);
    }
    for (var x = 0; x <= GRIDHEIGHT; x += 30) {
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

function randomDirection() {
    var result = Math.floor(Math.random() * shapes[randomShape()].length)
    return result;
} 

function randNumberWithMultiple(min, max, multiple) {
    var result = Math.floor(Math.random() * ((max - min) / multiple)) * BLOCK_SIZE + min;
    return result;
}

detectCollision(landed, active);

function detectCollision(matrix1, matrix2) {

    for (var row = 0; row < matrix1[0].length; row++) {
        for (var col = 0; col < matrix1[0].length; col++) {
            if (matrix1[row][col] == matrix2[row][col]) {
                console.log("SAME");
            }
        }
    }
}

function formBrick(shape,direction, gridRow, gridCol) {
    var gridRowOrig = gridRow;
    var gridColOrig = gridCol;

    for (var col = 0; col < shape[direction].length; col++) {
        for (var row = 0; row < shape[direction].length; row++) { 
                console.log("shape[direction].length: " + shape[direction].length);
                console.log("shape[direction][row][col]: " + shape[direction][row][col]);
               
            if ((shape[direction][row][col]) == 1) {
                // if (gridRow <= 0) {
                //     gridRow = 0;
                // }

            active[posGridRow][posGridCol] = 1;
                //else place 0? or unnecessary
                posGridCol++;
            }
            gridCol += BLOCK_SIZE;
        }

        gridCol = gridColOrig;
        gridRow += BLOCK_SIZE;
    }

}

function drawBrick(fillColor, strokeColor) {

    for (var row = 0; row < active[0].length; row++) {
        for (var col = 0; col < active[0].length; col++) {
            if (active[posGridRow][posGridCol] == 1) {
                context.beginPath();
                context.rect(posGridRow+BLOCK_SIZE,posGridCol+BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                context.lineWidth = 1;
                context.fillStyle = fillColor;
                context.strokeStyle = strokeColor;
                context.fill();
                context.stroke();
            }    
        }
    }
}

var tetrisPiece1 = new tetrisPiece(randNumberWithMultiple(0, GRIDWIDTH, BLOCK_SIZE),0,'#66999B','#1E8C91');
var tetrisPiece2 = new tetrisPiece(randNumberWithMultiple(0, GRIDWIDTH, BLOCK_SIZE),0,'#F5A623','#D08916');
var tetrisPiece3 = new tetrisPiece(randNumberWithMultiple(0, GRIDWIDTH, BLOCK_SIZE),0,'#FA4E4E','#DD4646');

var piecesArray = [];
piecesArray.push(tetrisPiece1);
piecesArray.push(tetrisPiece2);
piecesArray.push(tetrisPiece3);

/***************************
Game start
/***************************/

function init() {

    var game = function() {
        draw();
    }

    var draw = function() {        
        context.clearRect(0, 0, canvas.width, canvas.height);

        dropPiece(piecesArray[i]);
        drawBackground();
        
        for (var j = 0; j < piecesArray.length; j++) {
            if (piecesArray[j].visible) {  
                piecesArray[j].draw(piecesArray[j].posGridRow, piecesArray[j].posGridCol);
            }
        }
    }    

    var dropPiece = function(piece) {
        piece.visible = true;
        piece.posGridCol += 1;
        setPiece(piece);
    }

    var setPiece = function(currentPiece) {
        if (currentPiece.posGridCol >= (canvas.height - currentPiece.height)) { 
            // landed[currentPiece.x][currentPiece.y]
            i++;


            if (i < piecesArray.length) {
                dropPiece(piecesArray[i]);
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
        gameLoop = setInterval(game, 1);            
    }

    addEventListener( "keydown", function(e) {    

    // A moves left
    // if(e.keyCode == 65 && !hitLeftEdge) {
    if(e.keyCode == 65) {
        piecesArray[i].posGridRow -= BLOCK_SIZE;
    }

    // D moves right
    if(e.keyCode == 68) {
        piecesArray[i].posGridRow += BLOCK_SIZE;
        // hitLeftEdge = false;
    }

    // S speeds down
    if(e.keyCode == 83) {
        piecesArray[i].posGridCol += BLOCK_SIZE*2;
    }

    // R rotates
    if(e.keyCode == 82) {
        piecesArray[i].rotate();
    }

});

    newGame();
}

init();
