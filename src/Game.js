const {
  GAME_SPEED,
  DIRECTIONS,
  INITIAL_SNAKE_SIZE,
  SNAKE_COLOR,
  DOT_COLOR,
} = require('./constants')

const { Snake } = require('./Snake')

/**
 * @class Game
 *
 * The Game class tracks the state of three things:
 *
 * 1. The snake, including its direction, velocity, and location
 * 2. The dot
 * 3. The score
 *
 * The i/o of the game is handled by a separate UserInterface class, which is
 * responsible for detecting all event handlers (key press), creating the
 * screen, and drawing elements to the screen.
 */
class Game {
  constructor(ui, server) {
    // User interface class for all i/o operations
    this.ui = ui
    this.server = server
    this.snake = new Snake(INITIAL_SNAKE_SIZE, SNAKE_COLOR, this.snakeMoved.bind(this));

    this.reset()

    // Bind handlers to UI so we can detect input change from the Game class
    this.ui.bindHandlers(
      this.changeDirection.bind(this),
      this.quit.bind(this),
      this.start.bind(this)
    )

    this.server.bindHandlers(
      this.changeDirection.bind(this)
    )
  }

  reset() {
    // Set up initial state
    this.snake.reset();
    this.dot = {}
    this.score = 0
    this.timer = null

    // Generate the first dot before the game begins
    this.generateDot()
    this.ui.resetScore()
    this.ui.render()
  }

  /**
   * Support WASD and arrow key controls. Update the direction of the snake, and
   * do not allow reversal.
   */
  changeDirection(_, key) {
    // console.log('key: ', key);
    this.snake.changeDirection(key.name)
  }

  /**
   * Set the velocity of the snake based on the current direction. Create a new
   * head by adding a new segment to the beginning of the snake array,
   * increasing by one velocity. Remove one item from the end of the array to
   * make the snake move, unless the snake collides with a dot - then increase
   * the score and increase the length of the snake by one.
   *
   */
  snakeMoved(position, snake) {
    // If the snake lands on a dot, increase the score and generate a new dot
    // console.log('position: ', position);
    if (position.x === this.dot.x && position.y === this.dot.y) {
      this.snake.scored();
      this.ui.updateScore(this.score)
      this.generateDot()
    }
  }

  generateRandomPixelCoord(min, max) {
    // Get a random coordinate from 0 to max container height/width
    return Math.round(Math.random() * (max - min) + min)
  }

  generateDot() {
    // Generate a dot at a random x/y coordinate
    this.dot.x = this.generateRandomPixelCoord(0, this.ui.gameContainer.width - 1)
    this.dot.y = this.generateRandomPixelCoord(1, this.ui.gameContainer.height - 1)

    // If the pixel is on a snake, regenerate the dot
    if (this.snake.isAt(this.dot)) {
      this.generateDot()
    }
  }

  drawSnake() {
    // Render each snake segment as a pixel
    this.snake.segments.forEach(segment => {
      this.ui.draw(segment, this.snake.color)
    })
  }

  drawDot() {
    // Render the dot as a pixel
    this.ui.draw(this.dot, DOT_COLOR)
  }

  isGameOver() {
    // If the snake collides with itself, end the game
    const collide = this.snake.collision();

    return (
      collide ||
      // Right wall
      this.snake.segments[0].x >= this.ui.gameContainer.width - 1 ||
      // Left wall
      this.snake.segments[0].x <= -1 ||
      // Top wall
      this.snake.segments[0].y >= this.ui.gameContainer.height - 1 ||
      // Bottom wall
      this.snake.segments[0].y <= -1
    )
  }

  showGameOverScreen() {
    this.ui.gameOverScreen()
    this.ui.render()
  }

  tick() {
    if (this.isGameOver()) {
      this.showGameOverScreen()
      clearInterval(this.timer)
      this.timer = null

      return
    }

    this.ui.clearScreen()
    this.drawDot()
    this.drawSnake()
    this.ui.render()
  }

  start() {
    if (!this.timer) {
      this.reset()

      this.timer = setInterval(this.tick.bind(this), GAME_SPEED)
    }
  }

  quit() {
    process.exit(0)
  }
}

module.exports = { Game }
