//canvas def
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d'); 

//game area
function gameArea () {
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0,1300,610);
}

//moves, levels and flags count
var howLong, flags, level, flagsToGet

howLong = 1;
flags= 0;
level = 1;
flagsToGet = 1

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
}

//player figure
function drawPlayer(){
    ctx.fillStyle = 'black';
    ctx.fillRect(playerPos.x ,playerPos.y ,20,20);
}

//end position
var endPos ={
    x : Math.floor(Math.random()* 1240 +30),
    y : Math.floor(Math.random() * 540 +30)    
}

//end point figure
function drawEnd(){
    ctx.fillStyle = 'white';
	ctx.beginPath();
	ctx.arc(endPos.x,endPos.y, 15, 0,Math.PI*2, true);
	ctx.fill();
    //ctx.fillRect(Math.random()*1280,Math.random()*590,30,30);
}


//flag position
var flagPos ={
    x : Math.floor(Math.random()* 1240 +30),
    y : Math.floor(Math.random() * 540 +30)    
}

//flag figure
function drawFlag(){
    ctx.fillStyle = 'yellow';
	ctx.beginPath();
	ctx.arc(flagPos.x,flagPos.y, 15, 0,Math.PI*2, true);
	ctx.fill();
    //ctx.fillRect(Math.random()*1280,Math.random()*590,30,30);
}

//key settings
document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 38: playerPos.moveUp();    console.log('up',    playerPos); break;
      case 40: playerPos.moveDown();  console.log('down',  playerPos); break;
      case 37: playerPos.moveLeft();  console.log('left',  playerPos); break;
      case 39: playerPos.moveRight(); console.log('right', playerPos); break;
    }
    drawPlayer(playerPos);
  }

// reset positions func
function resetPositions(){
    playerPos.x = 10;
    playerPos.y = 10;
    endPos.x = Math.floor(Math.random()* 1240 +30);
    endPos.y = Math.floor(Math.random() * 540 +30);
    flagPos.x = Math.floor(Math.random()* 1240 +30),
    flagPos.y = Math.floor(Math.random() * 540 +30) 
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
    if (intersect(playerPos,endPos) && flagsToGet <= 0) {
        resetPositions();
        drawPlayer();
        drawEnd();
        level +=1;
        flagsToGet = level;
    }
}

//collect flags
function onFlag () {
    if (intersect(playerPos,flagPos) && flagsToGet > 0){
        flagsToGet -= 1


    }
}

//mines
var mines = {
    x : Math.floor(Math.random()* 1240 +30),
    y : Math.floor(Math.random()* 540 +30),
    speedX: Math.floor(Math.random()* 10),
    speedY: Math.floor(Math.random()* 10),
}

function drawMines() {
    ctx.fillStyle = 'red';
	ctx.beginPath();
	ctx.arc(mines.x,mines.y, 15, 0,Math.PI*2, true);
	ctx.fill();
};

function moveMines() {
	mines.x += mines.speedX;
    mines.y += mines.speedY;

    if(mines.x < 0) { //left
		mines.speedX *= -1;
	}
	if(mines.x > 1300) { // right
		mines.speedX *= -1;
	}
	if(mines.y < 0) { // top
		mines.speedY *= -1;
	}
	if(mines.y > 610) { // bottom
		mines.speedY *= -1;
    }
drawMines();
};

    

//game refresh
function refresh() {
    nextLevel();
    onFlag();
    gameArea();
    drawPlayer();
    drawEnd();
    drawFlag();
    data();
    moveMines();   
}


//game start
function startGame(){
    drawPlayer();
    drawEnd();
    drawFlag();
    data();
}

startGame();
setInterval(refresh, 30);  






// var myGameArea = {
//     canvas : document.createElement('canvas'),
//     start : function(){
//         this.canvas.width = 480;
//         this.canvas.height = 270;
//         this.context = this.canvas.getContext('2d');
//         document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//         this.interval = setInterval(updateGameArea, 20);
//     },
//     clear: function() {
//         this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
//     } 
// }

// function Component(width, height, color, x, y) {
//     this.width = width;
//     this.height = height;
//     this.x = x;
//     this.y = y;
//     this.speedX = 0;
//     this.speedY = 0;
//     this.update = function(){
//         ctx = myGameArea.context;
//         ctx.fillStyle = color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
//     this.newPos = function() {
//         this.x += this.speedX;
//         this.y += this.speedY;
//     }

// }

// function updateGameArea(){
//     myGameArea.clear();
//     player.update();
// }

// function moveUp() {
//     player.speedY -= 1;
// }

// function moveDown() {
//     player.speedY += 1;
// }

// function moveLeft() {
//     player.speedX -= 1;
// }

// function moveRight() {
//     player.speedX += 1;
// }

// document.onkeydown = function(e) {
//   switch (e.keyCode) {
//     case 38: moveUp();
//       break;
//     case 40: moveDown();
//       break;
//     case 37: moveLeft();
//       break;
//     case 39: moveRight();
//       break;
//   }
// }
// document.onkeyup = function(e) {
//     stopMove();
//   }
//   function stopMove() {
//       player.speedX = 0;
//       player.speedY = 0;
//   }

// myGameArea.canvas.className = 'canvas';
// var player = new Component(25,25,'red',10,10);
// myGameArea.start()


/*var player = {
    width: 25,
    height = 25,
    x = 10;
    y = 10;
}
*/