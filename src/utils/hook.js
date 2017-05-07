'use strict';

const logger = require('./logger').getLogger();
const hooks = new Map();
const hookValidation = require('./hook-validation');
const hookArguments = require('./hook-arguments');

function handle(req, id, callback) {

  logger.debug(req, 'handle incoming request...');

  let hook = hooks.get(id);
  if (hook === undefined) {
    return callback('none configured');
  }

  if (!hookValidation.validate(req.body, hook.config)) {
    return callback('invalid request');
  }

  let body = {
    id: id,
    arguments: hookArguments.getArguments(req.body, hook.config) || []
  };

  hook.socket.emit('POST', body);

  callback(null, hook.config['response-message']);
}

function add(socket, config) {
  config.forEach((hookConfig)=> {
    hooks.set(hookConfig.id, {socket: socket, config: hookConfig});
    logger.info(`Added hook for '${hookConfig.id}' ${JSON.stringify(socket.decoded_token)}`);
  });
}

function remove(socket, config) {
  config.forEach((hookConfig)=> {
    hooks.delete(hookConfig.id);
    logger.info(`Removed hook for '${hookConfig.id}' ${JSON.stringify(socket.decoded_token)}`);
  });
}

module.exports = {
  handle: handle,
  add: add,
  remove: remove
};
