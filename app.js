const startBtn = document.querySelector('.startBtn');
startBtn.addEventListener('click', game);

const resetBtn = document.querySelector('#reset');
const songAudio = document.querySelector('audioBtn'); // grabs audio
let score = document.querySelector('score'); // grabs the score
const canvas = document.createElement('canvas');
const canvasContainer = document.getElementById('canvas-container');

resetBtn.addEventListener('click', () => {
  console.log('clicked reset');
});

function game() {
  startBtn.style.display = 'none';

  resetBtn.style.display = 'inline';

  let harryPotter;
  let dementors = [];

  const dementorHeight = 260;
  const dementorWidth = 300;

  const gameArea = {
    canvas: canvas,
    // CREATES CANVAS
    start: function () {
      this.canvas.width = 1500;
      this.canvas.height = 600;
      this.context = this.canvas.getContext('2d');
      canvasContainer.appendChild(canvas), (this.frameNo = 0);
      this.interval = setInterval(updateGameArea, 10);
    },
    // CLEARS CANVAS
    clear: function () {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    // STOPS THE GAME
    stop: function () {
      clearInterval(this.interval);
    },
  };

  function gamePiece(width, height, color, x, y, type) {
    this.type = type;
    if (type == 'image') {
      this.image = new Image();
      this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    // UPDATES PIECE SO IT DOESN'T OVERLAP
    this.update = function () {
      context = gameArea.context;
      if (type == 'image') {
        context.drawImage(this.image, this.x, this.y, this.width, this.height);
      } else {
        context.fillStyle = color;
        context.fillRect(this.x, this.y, this.width, this.height);
      }
    };
    // MOVES PIECE WITHIN CANVAS
    this.newPosition = function () {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0) {
        this.x = 0;
      }
      if (this.x + this.width > gameArea.canvas.width) {
        this.x = gameArea.canvas.width - this.width;
      }
      if (this.y < 0) {
        this.y = 0;
      }
      if (this.y + this.height > gameArea.canvas.height) {
        this.y = gameArea.canvas.height - this.height;
      }
    };
    // CHECKS FOR COLLISION
    this.collisionWith = function (obstacle) {
      // SETS ALL SIDES OF PLAYER + OBSTACLES
      const gamePieceLeft = this.x + 20;
      const gamePieceRight = this.x + this.width - 20;
      const gamePieceTop = this.y + 20;
      const gamePieceBottom = this.y + this.height - 20;

      const obstacleLeft = obstacle.x + 120;
      const obstacleRight = obstacle.x + obstacle.width - 100;
      const obstacleTop = obstacle.y + 20;
      const obstacleBottom = obstacle.y + obstacle.height - 30;

      let collision = true;
      if (
        gamePieceBottom < obstacleTop ||
        gamePieceTop > obstacleBottom ||
        gamePieceRight < obstacleLeft ||
        gamePieceLeft > obstacleRight
      ) {
        collision = false;
      }
      return collision;
    };
  }

  // returns true if the current framenumber corresponds with the given interval
  function everyInterval(n) {
    if ((gameArea.frameNo / n) % 1 == 0) {
      return true;
    }
    return false;
  }

  function updateGameArea() {
    let x, y;
    //CHECK WHETHER THERE'S COLLISION OR NOT TO STOP DRAWING OBSTACLES
    for (i = 0; i < dementors.length; i += 1) {
      if (harryPotter.collisionWith(dementors[i])) {
        gameArea.stop();
        return;
      }
    }
    gameArea.clear();
    gameArea.frameNo += 1;
    // CREATES MULTIPLE OBSTACLES EVERY 550TH FRAME
    if (gameArea.frameNo == 1 || everyInterval(550)) {
      x = gameArea.canvas.width;
      minHeight = 0;
      maxHeight = gameArea.canvas.height - dementorHeight;
      y = Math.floor(Math.random() * maxHeight); // creates random y coordinate

      dementors.push(
        new gamePiece(
          dementorWidth,
          dementorHeight,
          'DEMENTOR.png',
          x,
          y,
          'image'
        )
      );
    }
    //MOVES OBSTACLES TOWARDS PLAYER
    for (i = 0; i < dementors.length; i += 1) {
      dementors[i].x += -1;
      dementors[i].update();
    }
    harryPotter.newPosition();
    harryPotter.update();
  }

  function handleKeydown(event) {
    // MOVES LEFT
    if (event.code === 'ArrowLeft') {
      harryPotter.speedX = -5;
    }
    // MOVES  RIGHT
    if (event.code === 'ArrowRight') {
      harryPotter.speedX = 5;
    }
    // MOVES UP
    if (event.code === 'ArrowUp') {
      harryPotter.speedY = -5;
    }
    // MOVES DOWN
    if (event.code === 'ArrowDown') {
      harryPotter.speedY = 5;
    }
  }
  document.addEventListener('keydown', handleKeydown);

  function handleKeyup(event) {
    // STOPS MOVING IN EITHER DIRECTION IF EITHER KEYS AREN'T PRESSED
    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
      harryPotter.speedX = 0;
    }
    if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
      harryPotter.speedY = 0;
    }
  }
  document.addEventListener('keyup', handleKeyup);

  function startGame() {
    harryPotter = new gamePiece(85, 85, 'harrypotter.png', 320, 120, 'image'); // CREATES HARRY WITH PICTURE
    gameArea.start();
  }
  startGame();
}
