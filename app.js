let harryPotter
let dementors = []

function startGame() {
    
    harryPotter = new gamePiece(30, 30, 'red', 10, 120) // CREATES HARRY
    gameArea.start()
}


const gameArea = {
    canvas : document.querySelector('canvas'),
   // CREATES CANVAS
    start : function() {
        this.canvas.width = 900
        this.canvas.height = 500
        this.context = this.canvas.getContext('2d')
        document.body.insertBefore(this.canvas, document.body.childNodes[0]),
        this.frameNo = 0
        this.interval = setInterval(updateGameArea, 20);
    },
    // CLEARS CANVAS
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  },
  // STOPS THE GAME 
     stop : function() {
        clearInterval(this.interval);
  }
}


function gamePiece(width, height, color, x, y){
    this.width = width
    this.height = height
    this.speedX = 0
    this.speedY = 0
    this.x = x
    this.y = y
    // UPDATES PIECE SO IT DOESN'T OVERLAP
    this.update = function(){
        context = gameArea.context
        context.fillStyle = color
        context.fillRect(this.x, this.y, this.width, this.height)
    }
    // MOVES PIECE
    this.newPosition = function() {
        this.x += this.speedX;
        this.y += this.speedY;
  }
    // CHECKS FOR COLLISION 
    this.collisionWith = function(obstacle) {
    // SETS ALL SIDES OF PLAYER + OBSTACLES 
        const gamePieceLeft = this.x
        const gamePieceRight = this.x + (this.width)
        const gamePieceTop = this.y
        const gamePieceBottom = this.y + (this.height)

        const obstacleLeft = obstacle.x;
        const obstacleRight = obstacle.x + (obstacle.width);
        const obstacleTop = obstacle.y;
        const obstacleBottom = obstacle.y + (obstacle.height);
    
        let collision = true
        if ((gamePieceBottom < obstacleTop) ||
            (gamePieceTop > obstacleBottom) ||
            (gamePieceRight < obstacleLeft) ||
            (gamePieceLeft > obstacleRight)) {
        collision = false
    }
        return collision
    }         
}
function updateGameArea() {
    let x, y
    //CHECK WHETHER THERE'S COLLISION OR NOT TO STOP DRAWING OBSTACLES
    for (i = 0; i < dementors.length; i += 1){
        if (harryPotter.collisionWith(dementors[i])){
            gameArea.stop()
            return
            } 
    }
    gameArea.clear()
    gameArea.frameNo += 1
    // CREATES MULTIPLE OBSTACLES EVERY 150TH FRAME
    if (gameArea.frameNo == 1 || everyInterval(200)) {
        x = gameArea.canvas.width;
        y = gameArea.canvas.height - 250
        dementors.push(new gamePiece(10, 300, 'black', x, y))
        dementors.push(new gamePiece(10, 100, 'black', x, 0)) //makes upside obstacle
        
    }
    //MOVES OBSTACLES TOWARDS PLAYER
    for (i = 0; i < dementors.length; i+= 1) {
        dementors[i].x += -1
        dementors[i].update()
    }
    harryPotter.newPosition()
    harryPotter.update()
}
// returns true if the current framenumber corresponds with the given interval
function everyInterval(n) {
  if ((gameArea.frameNo / n) % 1 == 0) {return true}
  return false
}

function handleKeydown(event) {
    // MOVES LEFT
  if (event.code === 'ArrowLeft') {
    harryPotter.speedX = -1
  }
   // MOVES UP
  if (event.code === 'ArrowRight') {
    harryPotter.speedX = 1
  }
   // MOVES UP
  if (event.code === 'ArrowUp') {
    harryPotter.speedY = -1
  }
   // MOVES DOWN
  if (event.code === 'ArrowDown') {
    harryPotter.speedY = 1
  }
}

function handleKeyup(event) {
    // STOPS MOVING IN EITHER DIRECTION IF EITHER KEYS AREN'T PRESSED
  if (event.code === 'ArrowLeft') {
    harryPotter.speedX = 0
  }
  if (event.code === 'ArrowRight') {
    harryPotter.speedY = 0
  }
    if (event.code === 'ArrowUp') {
    harryPotter.speedY = -2
  }
  if (event.code === 'ArrowDown') {
    harryPotter.speedY = 2
  }
}

document.addEventListener('keydown', handleKeydown)
document.addEventListener('keyup', handleKeyup)
startGame()
