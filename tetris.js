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
    this.visible = false;
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

var i = 0;

function init() {

    window.addEventListener('keydown', function(e) {
        t1.x += 10;
    },false);

    var game = function() {
        draw();
    }

    var draw = function() {        
        context.clearRect(0, 0, canvas.width, canvas.height);
        dropPiece(piecesArray[i]);
        background();

        for (var j = 0; j < piecesArray.length; j++) {
            if (piecesArray[j].visible) {
                context.drawImage(piecesArray[j].image, piecesArray[j].x, piecesArray[j].y);
            }
        }
    }    

    var dropPiece = function(piece) {
        piece.visible = true;
        piece.y += 1;
        setCurrentPiece(piece);
    }

    var setCurrentPiece = function(currentPiece) {
        if (currentPiece.y >= (canvas.height - currentPiece.height)) {
            currentPiece.y = 560;
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



