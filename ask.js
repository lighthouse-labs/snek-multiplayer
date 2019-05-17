const readline = require('readline');

const ask = function(question, cb) {
  process.stdin.pause()
  process.stdin.setRawMode(false)
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question(`${question} -> `, (answer) => {
    rl.close();
    cb(answer);
  });
}

module.exports = { ask };