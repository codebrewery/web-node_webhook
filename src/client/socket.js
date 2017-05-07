'use strict';

const io = require('socket.io-client');
const request = require('request-json');
const config = require('./../config').config;
const logger = require('./../utils/logger').getLogger();

// Create HTTP client
const client = request.createClient(config.serverURL);

function authenticate(callback) {

  // Authenticate the client
  client.post('auth/login/', {app: config.app, token: config.token}, (err, res, body)=> {
    if (err) {
      return logger.error(err);
    }
    if (res.statusCode !== 200) {
      return logger.error(body);
    }

    const socket = io.connect(config.serverURL);

    socket
      .on('connect', ()=> {
        socket.emit('authenticate', body); //send the jwt
      })
      .on('authenticated', ()=> {
        logger.info('Client is authenticated');
      })
      .on('unauthorized', (err)=> {
        if (err.data.type === 'UnauthorizedError' || err.data.code === 'invalid_token') {
          logger.warn('Client token has expired');
        }
      });

    addConnectionListeners(socket);

    // Return the socket to the main script
    callback(socket);
  });
}

function addConnectionListeners(socket) {
  socket.on('disconnect', function () {
    logger.info('Client disconnected');
  });

  socket.on('reconnecting', function (attempt) {
    logger.info(`Client reconnecting #${attempt}`);
  });

  socket.on('connect_timeout', function () {
    logger.info('Connection timeout');
  });

  socket.on('error', function (err) {
    logger.error(err);
  });
}

module.exports = {
  authenticate: authenticate
};
