var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d'); 
var howLong = 1;

var player = {
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

function draw(player){
    ctx.fillRect(player.x ,player.y ,20,20);
}
function endPosition(){
    ctx.fillRect(1264,582,20,20);
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 38: player.moveUp();    console.log('up',    player); break;
      case 40: player.moveDown();  console.log('down',  player); break;
      case 37: player.moveLeft();  console.log('left',  player); break;
      case 39: player.moveRight(); console.log('right', player); break;
    }
    draw(player);
    document.querySelector('.score').textContent = howLong;
  }


function startGame(){
    draw(player);
    endPosition();
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