//canvas def
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d'); 

//game area
function gameArea () {
    ctx.fillStyle = 'blue';
    ctx.fillRect(0,0,1300,610);
}

//points count
var howLong = 1;

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
    x : Math.random()* 1270,
    y : Math.random() * 580    
}

//end point figure
function setEndPosition(){
    ctx.fillStyle = 'white';
	ctx.beginPath();
	ctx.arc(endPos.x,endPos.y, 15, 0,Math.PI*2, true);
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
    document.querySelector('.score').textContent = howLong;
  }

//game refresh
 function updateScreen () {
    gameArea();
    drawPlayer();
    setEndPosition();
 }
setInterval(startGame, 30);  

//game start
function startGame(){
    gameArea();
    drawPlayer();
    setEndPosition();
}

startGame();







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