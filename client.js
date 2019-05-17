const net = require('net');
const ui  = require('./ui');

const connect = function(initials) {
  const conn = net.createConnection({ 
    host: 'localhost',//'192.168.88.47', 
    port: 50541
  });
  
  conn.on('connect', () => {
    // 'connect' listener
    conn.write(`Name: ${initials}`);
    console.log(`connected to server as ${initials}!`);
  });

  conn.on('data', (data) => {
    console.log('received: ', data.toString());
  });

  conn.on('end', () => {
    console.log('disconnected from server');
    process.exit();
  });

  return conn;
}

const run = function(initials) {
  // setup stdin
  const conn = connect(initials);
  ui.run(conn);
}

module.exports = { run };
