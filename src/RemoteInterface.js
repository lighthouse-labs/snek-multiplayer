const {
  MAX_IDLE_TIMEOUT,
  PORT
} = require('./constants')

const net = require('net');

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
    this.server = net.createServer((socket) => {
      // Important: This error handler  is different than the one below! - KV
      socket.on('error', (err) => {
        // ignore errors! - Without this callback, we can get a ECONNRESET error that crashes the server - KV
      })
    })
      .on('connection', this.handleNewClient.bind(this))
      .on('error', (err) => {
        // handle errors here
        console.log('Error: ', err);
        // throw err
      })
      .listen(PORT, () => {
        console.log('opened server on', this.server.address())
      })
  }

  idleBoot(client) {
    try {
      client.write('you ded cuz you idled\n', () => client.end())
    } catch (e) {
      // nothing to do really.
    }
  }

  resetIdleTimer(client, time) {
    if (client.idleTimer) clearTimeout(client.idleTimer)
    client.idleTimer = setTimeout(
      this.idleBoot.bind(this, client),
      time
    )
  }

  handleNewClient(client) {
    // process.stdout.write('\x07')
    client.setEncoding('utf8')
    this.clients.push(client)
    this.resetIdleTimer(client, MAX_IDLE_TIMEOUT / 2)

    if (this.newClientHandler) this.newClientHandler(client)

    client.on('data', this.handleClientData.bind(this, client))
    client.on('end', this.handleClientEnded.bind(this, client))
  }

  handleClientData(client, data) {
    if (this.clientDataHandler) {
      if (this.clientDataHandler(data, client)) this.resetIdleTimer(client, MAX_IDLE_TIMEOUT)
    }
  }

  handleClientEnded(client) {
    if (client.idleTimer) clearTimeout(client.idleTimer)
    if (this.clientEndHandler) this.clientEndHandler(client)
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
