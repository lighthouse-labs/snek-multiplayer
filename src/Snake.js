const {
  DIRECTIONS,
  MESSAGE_TIMEOUT
} = require('./constants')

class Snake {
  constructor(client, initialSize, initialLocation, color, autoMove, onMove) {
    this.client = client
    this.size = initialSize
    this.growBy = 0
    this.score = 0
    this.color = color
    this.snakeMoved = onMove
    this.autoMove = autoMove
    this.currentDirection = 'left'
    this.setStartPos(initialLocation)

    // these are set later
    this.message   = null
    this.name      = null
  }

  setStartPos(pos){
    this.setHead(pos)
    this.generateBody()
  }

  setHead(pos) {
    this.segments = []
    this.segments[0] = pos
  }

  generateBody() {
    let prev = this.segments[0] // start with head and work back to tail
    for (let i = 1; i <= this.size + 1; i++) {
      prev = {
        x: prev.x - DIRECTIONS[this.currentDirection].x,
        y: prev.y - DIRECTIONS[this.currentDirection].y,
      }
      this.segments[i] = prev
    }
  }

  setMessage(msg) {
    this.message = msg
    if (this.messageTimeout) clearTimeout(this.messageTimeout)
    this.messageTimeout = setTimeout(() => {
      this.message = null
    }, MESSAGE_TIMEOUT)
  }

  hitSnake(otherSnake) {
    const head = this.segments[0];
    return otherSnake.segments.some(seg => head.x === seg.x && head.y === seg.y)
  }

  hit(maxX, maxY) {
    // If the snake collides with itself, end the game
    const selfCollision = this.selfCollision()

    return (
      selfCollision ||
      // Right wall
      this.segments[0].x >= maxX ||
      // Left wall
      this.segments[0].x <= -1 ||
      // Top wall
      this.segments[0].y >= maxY ||
      // Bottom wall
      this.segments[0].y <= -1
    )
  }

  /**
   * Support movement controls. Update the direction of the snake, and
   * do not allow reversal.
   */
  changeDirection(dir) {
    let valid = false
    if ((dir === 'up' || dir === 'w') && this.currentDirection !== 'down') {
      this.currentDirection = 'up'
      valid = true
    } else if ((dir === 'down' || dir === 's') && this.currentDirection !== 'up') {
      this.currentDirection = 'down'
      valid = true
    } else if ((dir === 'left' || dir === 'a') && this.currentDirection !== 'right') {
      this.currentDirection = 'left'
      valid = true
    } else if ((dir === 'right' || dir === 'd') && this.currentDirection !== 'left') {
      this.currentDirection = 'right'
      valid = true
    }

    if (valid) {
      if (!this.autoMove) this.move()
      return true
    }
    return false
  }

  changeName(name) {
    this.name = name
    this.setMessage('Hey')
  }

  selfCollision() {
    return this.segments
      // Filter out the head
      .filter((_, i) => i > 0)
      // If head collides with any segment, collision
      .some(segment => segment.x === this.segments[0].x && segment.y === this.segments[0].y)
  }

  // woohoo!
  scored(points = 1) {
    this.score += points
  }

  isAt(position) {
    this.segments.forEach(segment => {
      if (segment.x === position.x && segment.y === position.y) return true
    })
    return false
  }

  bye(message) {
    try {
      if (message) {
        this.client.write(`${message}\n`, () => this.client.end())
      } else {
        this.client.end()
      }
    } catch (e) {
      // fail silently if client write/end error
    }
  }

  move() {
    // Move the head forward by one pixel based on velocity
    const head = {
      x: this.segments[0].x + DIRECTIONS[this.currentDirection].x,
      y: this.segments[0].y + DIRECTIONS[this.currentDirection].y,
    }
    this.segments.unshift(head)
    if (this.snakeMoved) this.snakeMoved(this.segments[0], this)
    if (this.growBy > 0) {
      this.growBy -= 1;
    } else {
      this.segments.pop()
    }
  }
}

module.exports = { Snake }
