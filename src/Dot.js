class Dot {

  constructor(x, y, color, onConsumed) {
    this.x = x
    this.y = y
    this.onConsumed = onConsumed
    this.color = color
  }

  isAt(pos) {
    return(pos.x === this.x && pos.y === this.y)
  }
}

module.exports = { Dot }