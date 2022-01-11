let harryPotter
let dementors = []


function startGame() {
    
    harryPotter = new gamePiece(85, 85, 'harrypotter.png', 10, 120, 'image') // CREATES HARRY WITH PICTURE
    gameArea.start()
    
}


const gameArea = {
    canvas : document.querySelector('canvas'),
   // CREATES CANVAS
    start : function() {
        this.canvas.width = 1500
        this.canvas.height = 500
        this.context = this.canvas.getContext('2d')
        document.body.insertBefore(this.canvas, document.body.childNodes[0]),
        this.frameNo = 0
        this.interval = setInterval(updateGameArea, 10);
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


function gamePiece(width, height, color, x, y, type){
    this.type = type
      if (type == 'image') {
       this.image = new Image();
       this.image.src = color;
   }
    this.width = width
    this.height = height
    this.speedX = 0
    this.speedY = 0
    this.x = x
    this.y = y
    // UPDATES PIECE SO IT DOESN'T OVERLAP
    this.update = function(){
        context = gameArea.context
        if (type == 'image') {
          context.drawImage(this.image,
          this.x,
          this.y,
          this.width, this.height);
    } else {
        context.fillStyle = color
        context.fillRect(this.x, this.y, this.width, this.height)
    }}
    // MOVES PIECE
    this.newPosition = function() {
        this.x += this.speedX;
        this.y += this.speedY;
  }
    // CHECKS FOR COLLISION 
    this.collisionWith = function(obstacle) {
    // SETS ALL SIDES OF PLAYER + OBSTACLES 
        const gamePieceLeft = this.x - 5
        const gamePieceRight = (this.x + (this.width)) - 5
        const gamePieceTop = this.y - 5
        const gamePieceBottom = (this.y + (this.height)) - 5

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
    // CREATES MULTIPLE OBSTACLES EVERY 550TH FRAME
    if (gameArea.frameNo == 1 || everyInterval(550)) {
        x = gameArea.canvas.width
        minHeight = 35
        maxHeight = 350
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight) // creates random height

        minGap = 100
        maxGap = 200 
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap) // creates random gap between the top and bottom obsttacle
      
        dementors.push(new gamePiece(10, height, 'black', x, 0)) //makes upside down  obstacle
        dementors.push(new gamePiece(10, x - height - gap, 'black', x, height + gap)) 
        
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
    harryPotter.speedX = -2
  }
   // MOVES UP
  if (event.code === 'ArrowRight') {
    harryPotter.speedX = 2
  }
   // MOVES UP
  if (event.code === 'ArrowUp') {
    harryPotter.speedY = -2
  }
   // MOVES DOWN
  if (event.code === 'ArrowDown') {
    harryPotter.speedY = 2
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