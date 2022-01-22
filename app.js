const startBtn = document.querySelector('.startBtn')
startBtn.addEventListener('click', game) // STARTS GAME

const resetBtn = document.querySelector('#reset')
resetBtn.addEventListener('click', game.restart) //RESTARTS GAME 

const songAudio = document.querySelector('audioBtn') 

const canvas = document.createElement('canvas') // CREATES CANVAS IN JS
const canvasContainer = document.getElementById('canvas-container')

let score = 0
const scoreElement = document.querySelector('.score')


function game() {
  startBtn.style.display = 'none'
  resetBtn.style.display = 'inline' //RESET BUTTON APPEARS
  resetBtn.addEventListener('click', restart)


  let harryPotter
  let dementors = []
  let goldenSnitches = []
  
  

  const dementorHeight = 240
  const dementorWidth = 280

  const goldenSnitchHeight = 35
  const goldenSnitchWidth = 64

  const gameArea = {
    canvas: canvas,
    // CREATES CANVAS
    start: function () {
      this.canvas.width = 1000
      this.canvas.height = 500
      this.context = this.canvas.getContext('2d')
      canvasContainer.appendChild(canvas), (this.frameNo = 0)
      this.interval = setInterval(updateGameArea, 10)
    },
    // CLEARS CANVAS
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    // STOPS THE GAME
    stop: function () {
      clearInterval(this.interval)
    },
  }

  function gamePiece(width, height, color, x, y, type) {
    this.type = type
    if (type == 'image') {
      this.image = new Image()
      this.image.src = color
    }
    this.width = width
    this.height = height
    this.speedX = 0
    this.speedY = 0
    this.x = x
    this.y = y

    // UPDATES PIECE SO IT DOESN'T OVERLAP
    this.update = function () {
      context = gameArea.context
      if (type == 'image') {
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
      } else {
        context.fillStyle = color
        context.fillRect(this.x, this.y, this.width, this.height)
      }
    }

    // MOVES PIECE WITHIN CANVAS
    this.newPosition = function () {
      this.x += this.speedX
      this.y += this.speedY
      // DOESN'T ALLOW PLAYER TO GO BEYOND CANVAS LIMITS
      if (this.x < 0) {
        this.x = 0
      }
      if (this.x + this.width > gameArea.canvas.width) {
        this.x = gameArea.canvas.width - this.width
      }
      if (this.y < 0) {
        this.y = 0
      }
      if (this.y + this.height > gameArea.canvas.height) {
        this.y = gameArea.canvas.height - this.height
      }
    }

    // CHECKS FOR COLLISION WITH DEMENTORS
    this.collisionWithDementors = function (obstacle) {
      // SETS ALL SIDES OF PLAYER + OBSTACLES
      const gamePieceLeft = this.x + 20
      const gamePieceRight = this.x + this.width - 20
      const gamePieceTop = this.y + 20
      const gamePieceBottom = this.y + this.height - 20

      const obstacleLeft = obstacle.x + 120
      const obstacleRight = obstacle.x + obstacle.width - 100
      const obstacleTop = obstacle.y + 30
      const obstacleBottom = obstacle.y + obstacle.height - 30

      let collision = true
      if (
        gamePieceBottom < obstacleTop ||
        gamePieceTop > obstacleBottom ||
        gamePieceRight < obstacleLeft ||
        gamePieceLeft > obstacleRight
      ) {
        collision = false
      }
      return collision
    }

    // CHECKS FOR COLLISION WITH SNITCH
    this.collisionWithSnitches = function (goldenSnitch) {
      // SETS ALL SIDES OF PLAYER + OBSTACLES
      const gamePieceLeft = this.x + 20
      const gamePieceRight = this.x + this.width - 20
      const gamePieceTop = this.y + 20
      const gamePieceBottom = this.y + this.height - 20

      const goldenSnitchLeft = goldenSnitch.x 
      const goldenSnitchRight = goldenSnitch.x + goldenSnitch.width 
      const goldenSnitchTop = goldenSnitch.y 
      const goldenSnitchBottom = goldenSnitch.y + goldenSnitch.height 

      let collision = true
      if (
        gamePieceBottom < goldenSnitchTop ||
        gamePieceTop > goldenSnitchBottom ||
        gamePieceRight < goldenSnitchLeft ||
        gamePieceLeft > goldenSnitchRight
      ) {
        collision = false
      }
      return collision
    }
  }
 
  function everyInterval(n) { 
    if ((gameArea.frameNo / n) % 1 == 0) {
      return true // returns true if the current framenumber corresponds with the given interval
    }
    return false
  }

  function generateObstaclesAndPoints() {
    // CREATES MULTIPLE OBSTACLES EVERY 350TH FRAME
     let x, y, a, b
    if (gameArea.frameNo == 1 || everyInterval(350)) {
      x = gameArea.canvas.width
      maxHeight = gameArea.canvas.height - dementorHeight
      y = Math.floor(Math.random() * maxHeight) // creates random y coordinate

      dementors.push(new gamePiece(dementorWidth, dementorHeight, 'DEMENTOR.png', x, y, 'image'))

      // CREATES GOLDEN POINTS EVERY 350TH FRAME
      a = gameArea.canvas.width
      maxHeight = gameArea.canvas.height - goldenSnitchHeight
      b = Math.floor(Math.random() * maxHeight) // creates random y coordinate

      goldenSnitches.push(new gamePiece(goldenSnitchWidth, goldenSnitchHeight, 'snitch.png', a, b, 'image'))
    }
  }

  function movesObstaclesAndPoints(){
    //MOVES OBSTACLES/POINTS TOWARDS PLAYER
    for (i = 0 ; i < dementors.length ; i += 1) {
      dementors[i].x += -1
      dementors[i].update()
    }
    for (i = 0 ; i < goldenSnitches.length ; i += 1) {
      goldenSnitches[i].x += -1
      goldenSnitches[i].update()
    }
  }

  function updateGameArea() {
    //CHECK WHETHER THERE'S COLLISION OR NOT TO STOP DRAWING OBSTACLES
    for (i = 0 ; i< dementors.length ; i += 1) {
      if (harryPotter.collisionWithDementors(dementors[i])) {
        gameArea.stop()
        return
      }
    }
    for (i = 0 ; i< goldenSnitches.length ; i += 1) {
      if (harryPotter.collisionWithSnitches(goldenSnitches[i])) {
        goldenSnitches.pop(i) 
        console.log('this' , i)
        const newScore = score + 1
        scoreElement.innerHTML = newScore
        console.log(newScore)
        return
      }
    }

    gameArea.clear()
    gameArea.frameNo += 1

    generateObstaclesAndPoints()
    movesObstaclesAndPoints()

    harryPotter.newPosition()
    harryPotter.update()
  }

  function handleKeydown(event) {
    // MOVES LEFT
    if (event.code === 'ArrowLeft') {
      harryPotter.speedX = -5
    }
    // MOVES  RIGHT
    if (event.code === 'ArrowRight') {
      harryPotter.speedX = 5
    }
    // MOVES UP
    if (event.code === 'ArrowUp') {
      harryPotter.speedY = -5
    }
    // MOVES DOWN
    if (event.code === 'ArrowDown') {
      harryPotter.speedY = 5
    }
  }
  document.addEventListener('keydown', handleKeydown)

  function handleKeyup(event) {
    // STOPS MOVING IN EITHER DIRECTION IF EITHER KEYS AREN'T PRESSED
    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
      harryPotter.speedX = 0
    }
    if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      harryPotter.speedY = 0
    }
  }
  document.addEventListener('keyup', handleKeyup)

  function startGame() {
    harryPotter = new gamePiece(85, 85, 'harrypotter.png', 320, 120, 'image') // CREATES HARRY WITH PICTURE
    gameArea.start()
  }

  function restart(){
    gameArea.clear()
    clearInterval(updateGameArea)
    clearInterval(generateObstaclesAndPoints)
    clearInterval(movesObstaclesAndPoints)
    clearInterval(everyInterval)
    // score = 0
    startGame()
  }
  
  startGame()
}
