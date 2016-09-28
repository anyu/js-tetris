var canvas = document.getElementById("grid");
var context = canvas.getContext("2d");

/***************************
Objects
/***************************/

var i = 0;
// var shapes = [I,J,L,O,S,T,Z];
var shapes = [I,J,L,S,T,Z];
var blockSize = 30;

var tetrisPiece = function (x, y, fillColor, strokeColor) {
    this.x = x;
    this.y = y;
    this.height = blockSize *3;
    this.width = blockSize *2;
    this.shape = shapes[randomShape()];
    this.direction = randomDirection();
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

function randomShape() {
    var result = Math.floor(Math.random() * shapes.length);
    return result;
} 

function randomDirection() {
    var result = Math.floor(Math.random() * shapes[randomShape()].length)
    return result;
} 

function formBrick(shape,direction,xPos,yPos,fillColor, strokeColor) {
    var xPosOrig = xPos;
    var yPosOrig = yPos;
    for (var row = 0; row < shape.length-1; row++) {
        for (var column = 0; column < shape.length-1; column++) { 
            if ((shape[direction][row][column]) == 1) {
                context.beginPath();
                context.rect(xPos, yPos, blockSize, blockSize);
                context.lineWidth = 2;
                context.fillStyle = fillColor;
                context.strokeStyle = strokeColor;
                context.fill();
                context.stroke();
            }
            xPos += blockSize;
        }
        xPos = xPosOrig;
        yPos += blockSize;
    }
}

function background() {
    context.beginPath();
    context.rect(0, 0, blockSize*15, blockSize*20);
    context.lineWidth = 3;
    context.strokeStyle = '#dddddd';
    context.stroke();
}

var tetrisPiece1 = new tetrisPiece(Math.floor(Math.random() * canvas.width),0,'#66999B','#1E8C91');
var tetrisPiece2 = new tetrisPiece(Math.floor(Math.random() * canvas.width),0, '#F5A623', '#D08916');
var tetrisPiece3 = new tetrisPiece(Math.floor(Math.random() * canvas.width),0, '#FA4E4E', '#DD4646');

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
        background();
        
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
    if(e.keyCode == 65 && piecesArray[i].x > 5) {
        piecesArray[i].x -= blockSize;
    }

    // D moves right
    if(e.keyCode == 68 && piecesArray[i].x < 300) {
        piecesArray[i].x += blockSize;
    }

    // S speeds down
    if(e.keyCode == 83) {
        piecesArray[i].y += blockSize*2;
    }

    // R rotates
    if(e.keyCode == 82) {
        piecesArray[i].rotate();
    }

});

    newGame();
}

init();
