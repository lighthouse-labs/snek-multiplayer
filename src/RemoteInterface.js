const net = require('net');
const PORT = 50541;

/**
 * @class UserInterface
 *
 * Interact with the input (keyboard directions) and output (creating screen and
 * drawing pixels to the screen). Currently this class is one hard-coded
 * interface, but could be made into an abstract and extended for multiple
 * interfaces - web, terminal, etc.
 */
class RemoteInterface {
  constructor() {
    this.clients = []
    this.launchServer()
  }

  launchServer() {
    this.server = net.createServer(this.handleNewClient.bind(this))
      .on('error', (err) => {
        // handle errors here
        throw err
      })
      .listen(PORT, () => {
        console.log('opened server on', this.server.address())
      })
  }

  handleNewClient(client) {
    // process.stdout.write('\x07')
    this.clients.push(client)
    
    client.setEncoding('utf8')
    
    if (this.newClientHandler) 
      this.newClientHandler(client)
    
    client.on('data', (data) => {
      const key = { name: data }
      if (this.clientDataHandler) this.clientDataHandler(key, client)
    })

    client.on('end', () => {
      if (this.clientEndHandler) this.clientEndHandler(client)
    })
  }

  bindHandlers(clientDataHandler, newClientHandler, clientEndHandler) {
    // Event to handle keypress i/o
    this.newClientHandler = newClientHandler
    this.clientDataHandler = clientDataHandler
    this.clientEndHandler = clientEndHandler
    // this.screen.on('keypress', keyPressHandler)
    // this.screen.key(['escape', 'q', 'C-c'], quitHandler)
    // this.screen.key(['enter'], enterHandler)
  }
}

module.exports = { RemoteInterface }
