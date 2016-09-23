var canvas = document.getElementById("grid");
var context = canvas.getContext("2d");


/***************************
Objects
/***************************/

function tetrisPiece(x, y) {
    this.x = x;
    this.y = y;
    this.height = 25;
    this.width = 25;
    this.color = "red";
    this.image;
}

function background() {
    context.beginPath();
    context.rect(0, 0, 400, 600);
    context.lineWidth = 3;
    context.strokeStyle = '#dddddd';
    context.stroke();
}

var t1 = new tetrisPiece(20, 20);
var tImage = new Image();
tImage.src = "shapeT.png";
t1.image = tImage;

var L1 = new tetrisPiece(150, 20);
var LImage = new Image();
LImage.src = "shapeL.png";
L1.image = LImage;

var piecesArray = [];
piecesArray.push(t1);
piecesArray.push(L1);

/***************************
Game start
/***************************/


var bool = true;
var i = 0;
var gameRunning = false;

function init() {
    gameRunning = true;

    var game = function() {
        draw();
    }

    var dropPiece = function(piece) {
        console.log(piece);
        piece.y += 1;
        context.drawImage(piece.image, piece.x, piece.y); 
        setCurrentPiece(piece);
    }

    var draw = function() {        
        context.clearRect(0, 0, canvas.width, canvas.height);
        dropPiece(piecesArray[i]);
        background();
    }    

    var setCurrentPiece = function(currentPiece) {
        if (currentPiece.y >= (canvas.height - currentPiece.height)) {
            context.drawImage(currentPiece.image, currentPiece.x, 560);
            console.log('piece' + i + 'is at bottom of screen');  
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
        gameRunning = false;
        clearInterval(gameLoop);
        return;
    };


    function newGame() {
        if (gameRunning) {
            gameLoop = setInterval(game, 1);            
        }
        // window.requestAnimationFrame(draw);
    }

    newGame();
}

init();



