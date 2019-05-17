const readline = require('readline');

const ask = function ask(question, cb) {
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