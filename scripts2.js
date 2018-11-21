//canvas def
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d'); 

//game area
function gameArea () {
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0,1300,610);
}

//moves, levels and flags count
var howLong, flags, level, flagsToGet, lives

howLong = 1;
flags= 0;
level = 1;
flagsToGet = 1;
lives = 3;

//function to display data
function data() {
    document.getElementById('score').textContent = howLong;
    document.getElementById('level').textContent = level;
    document.getElementById('flags').textContent = flags;
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


//flag position
var Flag = function flagFigure(x,y,figure) {
    this.x = Math.floor(Math.random()* 1240 +30),
    this.y = Math.floor(Math.random() * 540 +30),
    this.figure = function drawFlag(){
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x,this.y, 15, 0,Math.PI*2, true);
        ctx.fill();
    }
};    

//flag settings
var flagsToShow = [];
var flagsOnScreen = [];

// reset positions func
function resetPositions(){
    playerPos.x = 10;
    playerPos.y = 10;
    endPos.x = Math.floor(Math.random()* 1240 +30);
    endPos.y = Math.floor(Math.random() * 540 +30);
    for (i=0; i<=level; i++){
        flagsToShow[i] = 1;
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
            flagsToShow = [];
            for (i=0; i<level; i++){
                flagsOnScreen[i] = new Flag();
                flagsOnScreen[i].figure();
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

//game refresh
function refresh() {
    data();
    gameArea();
    playerPos.figure();
    endPos.drawEnd();
    onFlag();
    nextLevel();

}


//game start
function startGame(){
    data();
    playerPos.figure();
    endPos.drawEnd();
    for (i=0; i<level; i++){
flagsOnScreen[i] = new Flag();
flagsOnScreen[i].figure();
    }
};

startGame();
setInterval(refresh, 30);  