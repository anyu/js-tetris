var canvas = document.getElementById("grid");
var context = canvas.getContext("2d");

/***************************
Objects
/***************************/

var i = 0;

var tPiece = function (x, y) {
    this.x = x;
    this.y = y;
    this.height = 40;
    this.width = 60;
    this.visible = false;

    tPiece.prototype.draw = function(xPos, yPos) {
        formBrick(T, 0, xPos, yPos, '#66999B', '#1E8C91');
    }
}

var lPiece = function (x, y) {
    this.x = x;
    this.y = y;
    this.height = 40;
    this.width = 20;
    this.visible = false;

    lPiece.prototype.draw = function(xPos,yPos) {
        formBrick(L, 0, xPos, yPos, '#F5A623', '#D08916');
    }
}

function formBrick(shape,direction,xPos,yPos,fillColor, strokeColor) {
    var xPosOrig = xPos;
    var yPosOrig = yPos;
    for (var row = 0; row < shape.length-1; row++) {
        for (var column = 0; column < shape.length-1; column++) {
;    
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

var tPiece1 = new tPiece(50,0);
var lPiece1 = new lPiece(200,0);

var piecesArray = [];
piecesArray.push(tPiece1);
piecesArray.push(lPiece1);

/***************************
Game start
/***************************/


// var randomShape = Math.floor(Math.random() * shapes.length);
// var randomDirection = Math.floor(Math.random() * shapes[randomShape].length);

addEventListener( "keydown", function(e) {    
    if(e.keyCode == 65) {
        t1.x -= 5;
    }

    if(e.keyCode == 68) {
        t1.x += 5;
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

    window.addEventListener('keydown', function(e) {
        if (e.keyCode == '65') {
            t1.x -= 3;
        };

        if (e.keyCode == '68') {
            t1.x += 3;
        };
    },false);

    newGame();
}

init();



