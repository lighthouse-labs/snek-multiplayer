const net = require('net')

const connect = function(initials) {
  const conn = net.createConnection({ 
    host: 'localhost',//'192.168.88.47', 
    port: 50541
  })
  
  conn.on('connect', () => {
    // 'connect' listener
    conn.write(`Name: ${initials}`)
    console.log(`connected to server as ${initials}!`)
  })

  conn.on('data', (data) => {
    console.log('received: ', data.toString())
  })

  conn.on('end', () => {
    console.log('disconnected from server')
    process.exit()
  })

  return conn;
}

const setupInput = function() {
  const stdin = process.stdin
  stdin.setRawMode(true)
  stdin.setEncoding('utf8')
  stdin.resume()
  return stdin;
}

const setupUI = function(conn) {
  const stdin = setupInput()

  stdin.on('data', function( key ){
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
    } else if (key === 'q') {
      conn.end();
    }
  })
} 

const run = function(initials) {
  // setup stdin
  const conn = connect(initials);
  setupUI(conn);
}

module.exports = { run };
