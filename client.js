const connect = () => {
    const conn = net.createConnection({
      host: 'localhost',
      port: 50541
    })
    // interpret incoming data as text
    conn.setEncoding("utf8");
    conn.on('data', (data) => {  
    console.log(data);
  })
  
    return conn;
  };
  const reza = () => {return {
      name : 'reza',
      age: 32
  }}            

  module.exports = {
      connect :  connect,
      reza : reza
  }