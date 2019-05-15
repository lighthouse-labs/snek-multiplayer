const net = require('net');

// setup stdin
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.setEncoding('utf8');
// stdin.resume();

const conn = net.createConnection({ 
  host: 'localhost',//'192.168.88.47', 
  port: 50541
}, () => {
  // 'connect' listener
  console.log('connected to server!');
  conn.write('Name: KV');
});

conn.on('data', (data) => {
  console.log('received: ', data.toString());
  // client.end();
});

stdin.on('data', function( key ){
  // ctrl-c ( end of text )
  if ( key === '\u0003' ) {
    process.exit();
  } else if (key === 'w' || key === 's' || key === 'd' || key === 'a') {
    process.stdout.write( `sending: ${key}\n` );
    conn.write(key);
  } else if (key === 'q') {
    conn.end();
  }
});

conn.on('end', () => {
  console.log('disconnected from server');
  process.exit();
});