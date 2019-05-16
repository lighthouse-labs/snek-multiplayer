const {
  DIRECTIONS,
} = require('./constants')

class Snake {
  constructor(client, initialSize, color, onMove) {
    this.client = client
    this.initialSize = initialSize
    this.currentDirection = 'right'
    this.score = 0
    this.color = color
    this.snakeMoved = onMove
    this.reset()
  }

  reset() {
    this.segments = []
    for (let i = this.initialSize; i >= 0; i--) {
      this.segments[this.initialSize - i] = { x: i, y: 0 }
    }
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

  changeDirection(dir) {
    if ((dir === 'up' || dir === 'w') && this.currentDirection !== 'down') {
      this.currentDirection = 'up'
    }
    if ((dir === 'down' || dir === 's') && this.currentDirection !== 'up') {
      this.currentDirection = 'down'
    }
    if ((dir === 'left' || dir === 'a') && this.currentDirection !== 'right') {
      this.currentDirection = 'left'
    }
    if ((dir === 'right' || dir === 'd') && this.currentDirection !== 'left') {
      this.currentDirection = 'right'
    }
    this.move()
  }

  selfCollision() {
    return this.segments
      // Filter out the head
      .filter((_, i) => i > 0)
      // If head collides with any segment, collision
      .some(segment => segment.x === this.segments[0].x && segment.y === this.segments[0].y)
  }

  // woohoo!
  scored() {
    this.score++
  }

  isAt(position) {
    this.segments.forEach(segment => {
      if (segment.x === position.x && segment.y === position.y) return true
    })
    return false
  }

  bye() {
    // this.client.write('you ded\n', () => this.client.end())
    this.client.end()
  }

  move() {
    // Move the head forward by one pixel based on velocity
    const head = {
      x: this.segments[0].x + DIRECTIONS[this.currentDirection].x,
      y: this.segments[0].y + DIRECTIONS[this.currentDirection].y,
    }

    this.segments.unshift(head)
    
    this.snakeMoved(this.segments[0], this)
    
    // uncomment if we want the snake to grow
    // else {
      // Otherwise, slither
      this.segments.pop()
    //}
  }
}

module.exports = { Snake }