var canvas = document.getElementById("grid");
var context = canvas.getContext("2d");

/***************************
Objects
/***************************/

var i = 0;
var shapes = [I,J,L,O,S,T,Z];

var tetrisPiece = function (x, y) {
    this.x = x;
    this.y = y;
    this.height = 40;
    this.width = 100;
    this.visible = false;
    this.shape = shapes[randomShape()];
    this.direction = 0;

    tetrisPiece.prototype.draw = function() {
        formBrick(this.shape, this.direction, this.x, this.y, '#66999B', '#1E8C91');
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
                context.rect(xPos, yPos, 20,20);
                context.lineWidth = 1;
                context.fillStyle = fillColor;
                context.strokeStyle = strokeColor;
                context.fill();
                context.stroke();
            }
            xPos += 20;
        }
        xPos = xPosOrig;
        yPos += 20;
    }
}

function background() {
    context.beginPath();
    context.rect(0, 0, 400, 600);
    context.lineWidth = 3;
    context.strokeStyle = '#dddddd';
    context.stroke();
}

var tetrisPiece1 = new tetrisPiece(50,0);
var tetrisPiece2 = new tetrisPiece(200,0);

var piecesArray = [];
piecesArray.push(tetrisPiece1);
piecesArray.push(tetrisPiece2);

/***************************
Game start
/***************************/

addEventListener( "keydown", function(e) {    
    if(e.keyCode == 65) {
        piecesArray[i].x -= 5;
    }

    if(e.keyCode == 68) {
        piecesArray[i].x += 5;
    }

    if(e.keyCode == 82) {
        if (piecesArray[i].direction+1 > 3) {
            piecesArray[i].direction = 0;
        }
        else {
            piecesArray[i].direction += 1;
        }
    }

});

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

    function endGame() {
        clearInterval(gameLoop);
    };

    function newGame() {
        gameLoop = setInterval(game, 1);            
    }

    newGame();
}

init();



