const GAME_SPEED = 50
const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  right: { x: 1, y: 0 },
  left: { x: -1, y: 0 },
}
const INITIAL_SNAKE_SIZE = 4
const SNAKE_COLORS = [
  '#0F0FFF', 
  '#0FFFFF',
  '#0FFFF0',
  '#0F0FF0'
]
const DOT_COLORS = [
  'red'
]

const SNAKE_COLLISIONS = true
const MAX_IDLE_TIME = 1000000 // ms

// how long each Player/Snake's broadcast message stays on for
const MESSAGE_TIMEOUT = 9000 // ms

// auto move is the usual snake mode
// its off, meaning snakes are still until moved by players
const AUTO_MOVE_DEFAULT = false

module.exports = {
  GAME_SPEED,
  DIRECTIONS,
  INITIAL_SNAKE_SIZE,
  SNAKE_COLORS,
  DOT_COLORS,
  SNAKE_COLLISIONS,
  MAX_IDLE_TIME,
  MESSAGE_TIMEOUT,
  AUTO_MOVE_DEFAULT
}
