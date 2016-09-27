var canvas = document.getElementById("grid");
var context = canvas.getContext("2d");

/***************************
Objects
/***************************/

var tPiece = function (direction, x, y) {
    this.x = x;
    this.y = y;
    this.height = 40;
    this.width = 60;
    this.visible = false;

    tPiece.prototype.draw = function(xPos,yPos) {
        var xPos = this.x;
        var yPos = this.y;
        for (var row = 0; row < T.length-1; row++) {
            for (var column = 0; column < T.length; column++) {
                if ((T[direction][row][column]) == 1) {
                    context.beginPath();
                    context.rect(xPos, yPos, 20,20);
                    context.lineWidth = 1;
                    context.fillStyle = '#66999B';
                    context.strokeStyle = '#1E8C91';
                    context.fill();
                    context.stroke();
                }
                xPos += 20;
            }
            xPos = this.x;
            yPos += 20;
        }
    }
}

var lPiece = function (direction, x, y) {
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 20;
    this.visible = false;

    lPiece.prototype.draw = function(xPos,yPos) {
        var xPos = this.x;
        var yPos = this.y;
        for (var row = 0; row < L.length-1; row++) {
            for (var column = 0; column < L.length; column++) {
                if ((L[direction][row][column]) == 0) {
                }
                else if ((L[direction][row][column]) == 1) {
                    context.beginPath();
                    context.rect(xPos, yPos, 20,20);
                    context.lineWidth = 1;
                    context.fillStyle = '#F5A623';
                    context.strokeStyle = '#D08916';
                    context.fill();
                    context.stroke();
                }
                xPos += 20;
            }
            xPos = this.x;
            yPos += 20;
        }
    }
}

function background() {
    context.beginPath();
    context.rect(0, 0, 400, 600);
    context.lineWidth = 3;
    context.strokeStyle = '#dddddd';
    context.stroke();
}

var tPiece1 = new tPiece(0,50,0);
var lPiece1 = new lPiece(1,200,0);

var piecesArray = [];
piecesArray.push(tPiece1);
piecesArray.push(lPiece1);

/***************************
Game start
/***************************/

var i = 0;
// var shapes = [I,J,L,O,S,T,Z];
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



