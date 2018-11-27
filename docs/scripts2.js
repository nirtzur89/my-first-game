//moves, levels and flags count
var howLong, flags, level, flagsToGet, lives, totalScore, sum, inMotion, lastHighScore
inMotion = false;
howLong = 1;
flags= 0;
level = 1;
flagsToGet = 1;
lives = 3;
sum = 0;
lastHighScore = 0;
 totalScore = function(){
     sum = Math.round((howLong * (flags*1) * level)/100);
     return sum;
 };

 var startBtn = {
     x: 600,
     y: 200,
     width: 100,
     height: 100
 };

 //canvas def
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d'); 
var playWindow = {
    width : 1300,
    height : 560
};
//game area
function gameArea () {
    ctx.fillStyle = '#087F8C';
    ctx.fillRect(0,0,1480,690);
    
    ctx.fillStyle = "#095256";
    ctx.fillRect(0,560,1480,(690-560));
    
    ctx.fillStyle = "#095256";
    ctx.fillRect(1300,0,(1480-1300),690);

    ctx.drawImage(arraws,1310,20, 165, 160);
    ctx.drawImage(flagPic, 380, 570 , 40, 40);
    ctx.drawImage(levelPic, 110, 570 , 40, 40);
    ctx.drawImage(scorePic, 645, 570 , 40, 40);
    ctx.drawImage(HighScorePic, 905, 570 , 40, 40);

    if (!inMotion){
    ctx.drawImage(play, startBtn.x, startBtn.y, startBtn.width, startBtn.height)
    }
    
    for (i=0; i<lives; i++){
        dist = (i + 1) * 80;
        ctx.drawImage(heartPic,(1000+dist),600,45,45);
    }
}

//pics settings
var heartPic = new Image();
heartPic.src = "./heart.png"

var levelPic = new Image();
levelPic.src = "./level.png"

var scorePic = new Image();
scorePic.src = "./highscore.png"

var HighScorePic = new Image();
HighScorePic.src = "./score.png"

var minePic = new Image();
minePic.src = "./cat.png"

var flagPic = new Image();
flagPic.src = "./cheese.png"

var playerPic = new Image();
playerPic.src = "./mouse.png"

var endPosPic = new Image();
endPosPic.src = "./hole.png"

var arraws = new Image();
arraws.src = "./arraws.png"

var play = new Image();
play.src = "./play.png"

//function to display data
function data() {
    document.getElementById('score').textContent = "SCORE:  " +sum;
    document.getElementById('level').textContent = "LEVEL:  " + level;
    document.getElementById('flags').textContent ="CHEESE:  " + flags;
    document.getElementById('gameOver').textContent ="HIGH SCORE:  "+ lastHighScore;
}

//start click
function btnIntersect (btn,mouse){
    if (mouse.x > btn.x &&
        mouse.x < (btn.x+btn.width) &&
        mouse.y > btn.y &&
        mouse.y < (btn.y + btn.height)){
            return true;
        }
}

canvas.addEventListener('click', (e) => {
    const pos = {
      x: e.clientX,
      y: e.clientY
    };
    console.log (pos);
      if (btnIntersect(startBtn,pos)) {
        inMotion = true;
    };
  });

//player position
var playerPos = {
    x: 10,
    y: 10,
    width: 50,
    height: 50,
    moveUp:    function() { 
        if (this.y > 20) {
            this.y  -= 22; 
            howLong += 1;
        }
    },
    moveDown:  function() { 
        if (this.y < playWindow.height-50) {
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
        if (this.x < (playWindow.width-40)) {
        this.x += 22; howLong += 1;
        }
    },
    figure : function drawPlayer(){
        // ctx.fillStyle = 'black';
        // ctx.fillRect(playerPos.x ,playerPos.y ,20,20);
    ctx.drawImage(playerPic,this.x,this.y,this.width,this.height);
    }
};

//end position
var endPos ={
    x : Math.floor(Math.random()* (playWindow.width-50)),
    y : Math.floor(Math.random() * (playWindow.height-60)),
    width : 70,
    height : 90,
    drawEnd : function drawEnd(){
        // ctx.fillStyle = 'white';
        // ctx.beginPath();
        // ctx.arc(this.x,this.y, 15, 0,Math.PI*2, true);
        // ctx.fill();
        ctx.drawImage(endPosPic,this.x,this.y,this.width,this.height);
    }    
};

//key settings
document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 38: playerPos.moveUp(); break;
      case 40: playerPos.moveDown(); break;
      case 37: playerPos.moveLeft(); break;
      case 39: playerPos.moveRight(); break;
    }
    playerPos.figure();
  }


//flag object
var Flag = function flagFigure(x,y,figure) {
    this.x = Math.floor(Math.random()* (playWindow.width-50)),
    this.y = Math.floor(Math.random() * (playWindow.height-60)),
    this.width = 45,
    this.height = 45,
    this.figure = function drawFlag(){
        ctx.drawImage(flagPic,this.x,this.y,this.width,this.height);
    }
};    

//mine object
var Mine = function mineFigure(x,y,figure) {
    this.x = Math.floor(Math.random()* (playWindow.width-50)),
    this.y = Math.floor(Math.random() * (playWindow.height-60)),
    this.speedX = Math.floor((Math.random()* 6)+1),
    this.speedY = Math.floor((Math.random()* 6)+1),
    this.height = 50,
    this.width = 50,
    this.figure = function drawMine(){
        ctx.drawImage(minePic,this.x,this.y,this.width, this.height);
    }
    this.motion = function moveMines() {
        this.x += this.speedX;
        this.y += this.speedY;
    
        if(this.x < 10) { //left
            this.speedX *= -1;
        }
        if(this.x > (playWindow.width -50)) { // right
            this.speedX *= -1;
        }
        if(this.y < 10) { // top
            this.speedY *= -1;
        }
        if(this.y > (playWindow.height -50)) { // bottom
            this.speedY *= -1;
        }
            this.figure();
    };
};

//mine movement
function mineMove(){
        if (minesOnScreen.length > 0){
            for (i=0; i<level; i++){
                minesOnScreen[i].motion();
            }
    }    
}

//flag and mine arrays
var minesOnScreen = [];
var flagsOnScreen = [];

// reset positions func
function resetPositions(){
    playerPos.x = 10;
    playerPos.y = 10;
    endPos.x =Math.floor(Math.random()* (playWindow.width-50));
    endPos.y = Math.floor(Math.random() * (playWindow.height-60));
    for (i=0; i<=level; i++){
        flagsOnScreen[i] = new Flag();
        flagsOnScreen[i].figure();
            };
}

//intersection
function intersect(rect1, rect2) {
    var rect1left = rect1.x
    var rect1top = rect1.y
    var rect1right = rect1.x + rect1.width
    var rect1bottom = rect1.y + rect1.height

    var rect2left = rect2.x
    var rect2top = rect2.y
    var rect2right = rect2.x + rect2.width
    var rect2bottom = rect2.y + rect2.height

    return !(rect1left > rect2right
      || rect1right < rect2left
      || rect1top > rect2bottom
      || rect1bottom < rect2top)
  }

 //next level 
function nextLevel() {
    if (flagsOnScreen.length === 0){    
    if (intersect(playerPos,endPos)) {
            playerPos.x = 10;
            playerPos.y = 10;
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

//restart game function
function restart(){
    playerPos.x = 10;
    playerPos.y = 10;
    howLong = 1;
    flags= 0;
    level = 1;
    flagsToGet = 1;
    lives = 3;
    sum = 0;
    flagsOnScreen = [];
    minesOnScreen = [];
    startGame();
};    

//collect hit mine
function hitMine () {
    for (i=0; i<minesOnScreen.length; i++){
        if (intersect(playerPos,minesOnScreen[i])){
            lives -= 1
            if (lives >= 0){
                playerPos.x = 10;
                playerPos.y = 10;
                startGame();
            } else {
                inMotion = false; 
                if (sum>lastHighScore){
                    lastHighScore=sum;
                }
                restart();
            }
        }           
    }
    };

//game refresh
function refresh() {
    gameArea();
    data();
    if (inMotion){
        playerPos.figure();
        endPos.drawEnd();
        onFlag();
        hitMine();
        nextLevel();
        mineMove();
        totalScore();
    }
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