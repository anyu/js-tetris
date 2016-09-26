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
    this.image;
    this.visible = false;
}

function tetrisSquare (x, y, color) {
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(x, y, 20,20);
    context.rect(x, y, 20,20);
    context.lineWidth = 2;
    context.strokeStyle = '#1E8C91';
    context.stroke();
    this.visible = false;
}

function background() {
    context.beginPath();
    context.rect(0, 0, 400, 600);
    context.lineWidth = 3;
    context.strokeStyle = '#dddddd';
    context.stroke();
}

var t1 = new tetrisPiece(20, 0);
var tImage = new Image();
tImage.src = "shapeT.png";
t1.image = tImage;

var L1 = new tetrisPiece(150, 0);
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
var shapes = [I,J,L,O,S,T,Z];
var randomShape = Math.floor(Math.random() * shapes.length);
var randomDirection = Math.floor(Math.random() * shapes[randomShape].length);

addEventListener( "keydown", function(e) {    
    if(e.keyCode == 65) {
        t1.x -= 5;
    }

    if(e.keyCode == 68) {
        t1.x += 5;
    }

});

function init() {

    function generateShape(shape, direction, x, y) {

        for (var row = 0; row < shape.length-1; row++) {
            for (var column = 0; column < shape.length; column++) {
                if ((shape[direction][row][column]) == 0) {
                }
                else if ((shape[direction][row][column]) == 1) {
                    tetrisSquare(x,y, "#66999B");
                }
                x += 20;
            }
            x = 40;
            y += 20;
        } 
    }

    var game = function() {
        draw();
    }

    var draw = function() {        
        context.clearRect(0, 0, canvas.width, canvas.height);

        dropPiece(piecesArray[i]);
        generateShape(shapes[randomShape], randomDirection, 40, 20);
        // var tpiece = generateShape(shapes[randomShape], randomDirection, 40, 20);
        // dropPiece(tpiece);
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
        setPiece(piece);
    }

    var setPiece = function(currentPiece) {
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



