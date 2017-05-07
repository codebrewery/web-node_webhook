'use strict';

const socketIO = require('socket.io');
const socketioJwt = require('socketio-jwt');
const logger = require('./../utils/logger').getLogger();
const config = require('../config').config;
const hook = require('./../utils/hook');

/**
 * Start the server
 * @param config
 * @param app
 */
function startServer(config, app) {
  const server = require('http').createServer(app);
  const io = socketIO(server);
  init(io);
  server.listen(config.port, ()=> {
    logger.info(`App listening on port ${config.port}`);
  });
}

// Add authentication flow
function init(io) {
  io.sockets
    .on('connection', socketioJwt.authorize({
      secret: config.secret,
      timeout: 5000 // 5 seconds to send the authentication message
    }))
    .on('authenticated', (socket)=> {
      //this socket is authenticated, we are good to handle more events from it.
      logger.info('Client connected ', socket.decoded_token);

      onAuth(socket);
    });
}

// When the client has been authenticated
function onAuth(socket) {

  // Configure the webhook
  socket.on('configure', (hookData)=> {
    hook.add(socket, hookData);

    // On disconnect, remove the configuration
    socket.on('disconnect', ()=> {
      hook.remove(socket, hookData);
    });
  });
}

module.exports = {
  startServer: startServer
};
