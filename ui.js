const { ask } = require('./ask');
let commandMode;
let conn;

const setupInput = function() {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  return stdin;
}

const handleUserInput = function( key ) {
  if (!commandMode) return;
  // ctrl-c ( end of text )
  if ( key === '\u0003' ) {
    process.exit();
  } else if (key === 'w') {
    // process.stdout.write( `sending: ${key}\n` )
    const msg = 'Move: up';
    console.log('sending: ', msg);
    conn.write(msg);
  } else if (key === 'a') {
    const msg = 'Move: left';
    console.log('sending: ', msg);
    conn.write(msg);
  } else if (key === 's') {
    const msg = 'Move: down';
    console.log('sending: ', msg);
    conn.write(msg);
  } else if (key === 'd') {
    const msg = 'Move: right';
    console.log('sending: ', msg);
    conn.write(msg);
  } else if (key === 'i') {
    commandMode = false;
    ask('Raw Command: -> ', (cmd) => {
      console.log('sending: ', cmd);
      conn.write(cmd);
      setupInput();
      commandMode = true;
    });
  } else if (key === 'q') {
    conn.end();
  }
}

const run = function(connection) {
  const stdin = setupInput();
  commandMode = true;
  conn = connection;

  stdin.on('data', handleUserInput);
} 

module.exports = { run };