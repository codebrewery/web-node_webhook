'use strict';

const exec = require('child_process').exec;
const logger = require('../utils/logger').getLogger();
const socketClient = require('./socket');
const configReader = require('../utils/config-reader');

const hooks = configReader.fetchConfig('hooks');

// Cache hooks for easy access
const cachedHooks = new Map();

hooks.forEach((hook)=> {
  logger.info(`Configured hook '${hook.id}'`);
  cachedHooks.set(hook.id, hook);
});

// Connect and authenticate the client
socketClient.authenticate((socket)=> {

  // On receiving an incoming webhook
  socket
    .on('authenticated', ()=> {
      socket.emit('configure', hooks);
    })
    .on('POST', (data)=> {
      logger.info('Post received', data);

      // Get the hook configuration
      let hook = cachedHooks.get(data.id);
      if (hook !== undefined) {
        process(hook['execute-command'], hook['command-working-directory'], data['arguments']);
      }
    });
});

/**
 * Execute a shell command
 * @param command
 * @param workingDir
 * @param params
 */
function process(command, workingDir, params) {
  let args = params.join(' ');
  let cmd = `${command} ${args}`;
  logger.info('Performing command...', cmd);
  exec(cmd, {cwd: workingDir}, (error, stdout, stderr) => {
    if (error) {
      logger.error(`exec error: ${error}`);
      return;
    }
    if (stdout) {
      logger.info(`stdout: ${stdout}`);
    }
    if (stderr) {
      logger.error(`stderr: ${stderr}`);
    }
  });
}
