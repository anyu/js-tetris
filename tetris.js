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

function init() {
  
    var setCurrentPiece = function(currentPiece) {
        if ((currentPiece.y >= canvas.height - currentPiece.height)) {
            context.drawImage(currentPiece.image, currentPiece.x, 560);  
            if (bool) {
                dropPiece(piecesArray[1]);
            }

        }
    }

    var dropPiece = function(nextPiece) {
        nextPiece.y += 1;
        context.drawImage(nextPiece.image, nextPiece.x, nextPiece.y); 
        setCurrentPiece(nextPiece);
    }

    var draw = function() {        
        context.clearRect(0, 0, canvas.width, canvas.height);

        dropPiece(piecesArray[0]);
        background();
    }

    var game = function() {
        // update();
        draw();
    }

    function newGame() {
        gameLoop = setInterval(game, 1);
        // window.requestAnimationFrame(draw);
    }

    newGame();
}

init();



