'use strict';

const express = require('express');
const loggerUtil = require('./../utils/logger');
const routes = require('./routes');
const bodyParser = require('body-parser');
const validation = require('./../utils/api-validation');

function configure(config, listen) {

  const app = express();

  loggerUtil.configure(app);

  // Add the body parser
  app.use(bodyParser.json()); // support json encoded bodies
  app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

  // Connect all our routes to our application
  app.use('/', routes);

  // use validation error handling
  app.use(validation.middleware);

  if (listen === true) {
    // Turn on that server!
    app.listen(config.port, ()=> {
      loggerUtil.getLogger().info(`App listening on port ${config.port}`);
    });
  }

  return app;
}

module.exports = {
  configure: configure
};
