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


function init() {
  
    var update = function() {

    }

    var draw = function() {

        t1.y += 1;
        context.clearRect(0,0,canvas.width,canvas.height);
        context.drawImage(tImage,t1.x,t1.y);
        background();

        if (t1.y > canvas.height) {
            L1.y += 1;
            context.drawImage(LImage,L1.x,L1.y);
        }
    }

    var game = function() {
        update();
        draw();
    }

    function newGame() {
        gameLoop = setInterval(game, 1);
    }

    newGame();
}

init();



