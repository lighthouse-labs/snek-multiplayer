const GAME_SPEED = 20
const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
}
const INITIAL_SNAKE_SIZE = 4
const SNAKE_COLOR = '#0F0FFF'
const DOT_COLOR = 'red'

module.exports = {
  GAME_SPEED,
  DIRECTIONS,
  INITIAL_SNAKE_SIZE,
  SNAKE_COLOR,
  DOT_COLOR,
}
