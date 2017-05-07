'use strict';

const routes = require('express').Router();

// The authentication route for clients to authenticate
routes.use('/auth', require('./auth'));

// The hooks route for incoming webhooks
routes.use('/hooks', require('./hooks'));

module.exports = routes;
