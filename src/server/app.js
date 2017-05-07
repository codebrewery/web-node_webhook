'use strict';

const config = require('../config').config;

// Run the server
const app = require('./server').configure(config);

// Start the server with socket io on the same port
const socketIo = require('./socket').startServer(config, app);
