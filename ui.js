const { ask } = require('./ask');

let commandMode = true;
let conn;

const beginCommandMode = function() {
  commandMode = true;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  return stdin;
}

const send = function(msg) {
  console.log('sending: ', msg);
  conn.write(msg);
}

const handleMovement = function(key) {
  if (key === 'w') {
    send('Move: up');
  } else if (key === 'a') {
    send('Move: left');
  } else if (key === 's') {
    send('Move: down');
  } else if (key === 'd') {
    send('Move: right');
  }
}

const handleManualInput = function() {
  commandMode = false;
  ask('Raw Command', (cmd) => {
    console.log('sending: ', cmd);
    conn.write(cmd);
    beginCommandMode();
    commandMode = true;
  });
}

const handleUserInput = function( key ) {
  if (!commandMode) return;
  if ( key === '\u0003' ) {
    // ctrl-c ( end of text )
    process.exit();
  } else if (key === 'w' || key === 'a' || key === 's' || key === 'd') {
    handleMovement(key);
  } else if (key === 'i') {
    handleManualInput();
  } else if (key === 'q') {
    conn.end();
  }
}

const run = function(connection) {
  const stdin = beginCommandMode();
  conn = connection;
  stdin.on('data', handleUserInput);
} 

module.exports = { run };