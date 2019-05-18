
const randomNum = function(min, max) {
  // Get a random coordinate from 0 to max container height/width
  return Math.round(Math.random() * (max - min) + min)
}

module.exports = { randomNum }