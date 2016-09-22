var canvas = document.getElementById("grid");
var context = canvas.getContext("2d");


/***************************
Objects
/***************************/

function tetrisPiece(x,y) {
    this.x = x;
    this.y = y;
    this.height = 25;
    this.width = 25;
    this.color = "red";
}

function background() {
    context.beginPath();
    context.rect(0, 0, 400, 600);
    context.lineWidth = 3;
    context.strokeStyle = '#dddddd';
    context.stroke();
}

var t1 = new tetrisPiece(20,20);
var tImage = new Image();
tImage.src = "shapeT.png";

var L1 = new tetrisPiece(150,20);

var LImage = new Image();
LImage.src = "shapeL.png";

/***************************
Game start
/***************************/
var nextPieceReady = false;

function init() {
  
    var setCurrentPiece = function(image,x) {
        context.drawImage(image, x, 560);  
    }

    var dropNextPiece = function(nextPiece,nextPieceX,nextPieceY) {
        // nextPieceY += 1;
        context.drawImage(nextPiece, nextPieceX, nextPieceY);  
    }

    var update = function() {
        

    }

    var draw = function() {
        t1.y += 1;
        context.clearRect(0,0,canvas.width,canvas.height);
        context.drawImage(tImage,t1.x,t1.y);

        if (t1.y >= canvas.height-t1.height) {
            setCurrentPiece(tImage,t1.x);
            L1.y += 1;
            dropNextPiece(LImage,L1.x,L1.y);
        }

        if (L1.y >= canvas.height-L1.height) {
            setCurrentPiece(LImage,L1.x);
        }

        background();
    }

    var game = function() {
        update();
        draw();
    }

    function newGame() {
        gameLoop = setInterval(game, 1);
        // window.requestAnimationFrame(draw);
    }

    newGame();
}

init();



