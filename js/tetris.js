/***************************
CURRENT BUGS: 
1) Right bound not set
2) Bottom bound not complete

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
var i = 0;
// var hitLeftEdge = false;
// var hitRightEdge = false;


var tetrisPiece = function (x, y, fillColor, strokeColor) {
    this.x = x;
    this.y = y;
    this.height = BLOCK_SIZE *3;
    this.width = BLOCK_SIZE *2;
    this.shape = shapes[randomShape()];
    this.direction = randomDirection();
    // this.shape = S;
    // this.direction = 1;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.visible = false;

    tetrisPiece.prototype.draw = function() {
        formBrick(this.shape, this.direction, this.x, this.y, this.fillColor, this.strokeColor);
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

function formBrick(shape,direction,xPos,yPos,fillColor, strokeColor) {
    var xPosOrig = xPos;
    var yPosOrig = yPos;

    for (var column = 0; column < shape[direction].length; column++) {
        for (var row = 0; row < shape[direction].length; row++) { 

            if ((shape[direction][row][column]) == 1) {
                if (xPos <= 0) {
                    hitLeftEdge = true;
                    xPos = 0;
                }
                // else if (xPos + BLOCK_SIZE >= GRIDWIDTH) {
                //     hitRightEdge = true;
                // }
                context.beginPath();
                context.rect(xPos, yPos, BLOCK_SIZE, BLOCK_SIZE);
                context.lineWidth = 1;
                context.fillStyle = fillColor;
                context.strokeStyle = strokeColor;
                context.fill();
                context.stroke();
            }
            yPos += BLOCK_SIZE;
        }

        yPos = yPosOrig;
        xPos += BLOCK_SIZE;
    }

}

// function occupied(x,y) {
// }

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
                piecesArray[j].draw(piecesArray[j].x, piecesArray[j].y);
            }
        }
    }    

    var dropPiece = function(piece) {
        piece.visible = true;
        piece.y += 1;
        setPiece(piece);
    }

    var setPiece = function(currentPiece) {
        if (currentPiece.y >= (canvas.height - currentPiece.height)) {
            i++;
            if (i < piecesArray.length) {
                dropPiece(piecesArray[i]);
            }
            else {
                endGame();
            }

        }
    }

    function checkIfOccupied() {
        if (piecesArray[i].y) {
            alert("I'm occupied");
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
    if(e.keyCode == 65 && !hitLeftEdge) {
        piecesArray[i].x -= BLOCK_SIZE;
    }

    // D moves right
    if(e.keyCode == 68) {
        piecesArray[i].x += BLOCK_SIZE;
        hitLeftEdge = false;
    }

    // S speeds down
    if(e.keyCode == 83) {
        piecesArray[i].y += BLOCK_SIZE*2;
    }

    // R rotates
    if(e.keyCode == 82) {
        piecesArray[i].rotate();
    }

});

    newGame();
}

init();
