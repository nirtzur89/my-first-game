//canvas def
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d'); 

//game area
function gameArea () {
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0,1300,610);
}

//moves, levels and flags count
var howLong, flags, level, flagsToGet, lives, totalScore, sum

howLong = 1;
flags= 0;
level = 1;
flagsToGet = 1;
lives = 3;
sum = 0;
totalScore = function sum(){
    sum = (howLong * (flags*1) * level);
    return sum;
};

//function to display data
function data() {
    document.getElementById('score').textContent = howLong;
    document.getElementById('level').textContent = level;
    document.getElementById('flags').textContent = flags;
    document.getElementById('gameOver').textContent = sum;
}

//player position
var playerPos = {
    x: 10,
    y: 10,
    moveUp:    function() { 
        if (this.y > 20) {
            console.log(this.y)
            this.y  -= 22; 
            howLong += 1;
        }
    },
    moveDown:  function() { 
        if (this.y < 570) {
            this.y += 22;
            howLong += 1;
        }
     },
    moveLeft:  function() {
        if (this.x > 20){
        this.x -= 22; howLong += 1;
        }
    },
    moveRight: function() {
        if (this.x < 1260) {
        this.x += 22; howLong += 1;
        }
    },
    figure : function drawPlayer(){
        ctx.fillStyle = 'black';
        ctx.fillRect(playerPos.x ,playerPos.y ,20,20);
    }
};

//end position
var endPos ={
    x : Math.floor(Math.random()* 1240 +30),
    y : Math.floor(Math.random() * 540 +30),
    drawEnd : function drawEnd(){
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x,this.y, 15, 0,Math.PI*2, true);
        ctx.fill();
    }    
};

//key settings
document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 38: playerPos.moveUp();    console.log('up',    playerPos); break;
      case 40: playerPos.moveDown();  console.log('down',  playerPos); break;
      case 37: playerPos.moveLeft();  console.log('left',  playerPos); break;
      case 39: playerPos.moveRight(); console.log('right', playerPos); break;
    }
    playerPos.figure();
  }


//flag object
var Flag = function flagFigure(x,y,figure) {
    this.x = Math.floor(Math.random()* 1240 +30),
    this.y = Math.floor(Math.random() * 540 +30),
    this.figure = function drawFlag(){
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x,this.y, 10, 0,Math.PI*2, true);
        ctx.fill();
    }
};    

//mine object
var Mine = function mineFigure(x,y,figure) {
    this.x = Math.floor(Math.random()* 1240 +30),
    this.y = Math.floor(Math.random() * 540 +30),
    this.speedX = Math.floor(Math.random()* 10),
    this.speedY = Math.floor(Math.random()* 10),
    this.figure = function drawMine(){
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x,this.y, 10, 0,Math.PI*2, true);
        ctx.fill();
    }
    this.motion = function moveMines() {
        this.x += this.speedX;
        this.y += this.speedY;
    
        if(this.x < 0) { //left
            this.speedX *= -1;
        }
        if(this.x > 1300) { // right
            this.speedX *= -1;
        }
        if(this.y < 0) { // top
            this.speedY *= -1;
        }
        if(this.y > 610) { // bottom
            this.speedY *= -1;
        }
            this.figure();
    };
};

//mine movement
function mineMove(){
    for (i=0; i<level; i++){
        minesOnScreen[i].motion();
    }
}

//flag and mine arrays
var minesOnScreen = [];
var flagsOnScreen = [];

// reset positions func
function resetPositions(){
    playerPos.x = 10;
    playerPos.y = 10;
    endPos.x = Math.floor(Math.random()* 1240 +30);
    endPos.y = Math.floor(Math.random() * 540 +30);
    for (i=0; i<=level; i++){
        flagsOnScreen[i] = new Flag();
        flagsOnScreen[i].figure();
            };
}

//intersection
function intersect(rect1, rect2) {
    var rect1left = rect1.x
    var rect1top = rect1.y
    var rect1right = rect1.x + 20
    var rect1bottom = rect1.y + 20

    var rect2left = rect2.x
    var rect2top = rect2.y
    var rect2right = rect2.x + 30
    var rect2bottom = rect2.y + 30

    return !(rect1left > rect2right
      || rect1right < rect2left
      || rect1top > rect2bottom
      || rect1bottom < rect2top)
  }

 //next level 
function nextLevel() {
    if (flagsOnScreen.length === 0){    
    if (intersect(playerPos,endPos)) {
            resetPositions();
            playerPos.figure();
            endPos.drawEnd();
            level +=1;
            flagsToGet = level;
            for (i=0; i<level; i++){
                flagsOnScreen[i] = new Flag();
                flagsOnScreen[i].figure();
                minesOnScreen[i] = new Mine();
                minesOnScreen[i].figure();
                    }
        };
    };    
    };

//collect flags
function onFlag () {
for (i=0; i<flagsOnScreen.length; i++){
    if (intersect(playerPos,flagsOnScreen[i])){
        flagsOnScreen.splice([i],1);
        flags += 1;
    }           
    flagsOnScreen[i].figure();
}
};

//collect hit mine
function hitMine () {
    for (i=0; i<minesOnScreen.length; i++){
        if (intersect(playerPos,minesOnScreen[i])){
            lives -= 1
            if (lives >= 0){
                startGame();
            } else { 

            }
        }           
    }
    };

//game refresh
function refresh() {
    data();
    gameArea();
    playerPos.figure();
    endPos.drawEnd();
    onFlag();
    hitMine();
    nextLevel();
    mineMove();
}


//game start
function startGame(){
    data();
    playerPos.figure();
    endPos.drawEnd();
    for (i=0; i<level; i++){
flagsOnScreen[i] = new Flag();
flagsOnScreen[i].figure();
minesOnScreen[i] = new Mine();
minesOnScreen[i].figure();
    }
};

startGame();
setInterval(refresh, 30);  