const GAME_SPEED = 20
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
  'red',
  'green',
  'blue',
  'white',
  'gray'
]

const SNAKE_COLLISIONS = true
const MAX_IDLE_TIME = 2000 // ms

module.exports = {
  GAME_SPEED,
  DIRECTIONS,
  INITIAL_SNAKE_SIZE,
  SNAKE_COLORS,
  DOT_COLORS,
  SNAKE_COLLISIONS,
  MAX_IDLE_TIME
}
