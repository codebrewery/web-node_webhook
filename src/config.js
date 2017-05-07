'use strict';

const config = {
  app: process.env.APP || 'default',
  token: process.env.APP_TOKEN || 'default-token',
  secret: process.env.SECRET || 'QA1KPVPanMvtgf0otsie4pRqS1M_wffvqUd1g',
  secretExpiry: process.env.SECRET_EXPIRY || 60,
  port: process.env.PORT || '8080',
  socketPort: process.env.SOCKET_PORT || '443',
  serverURL: process.env.SERVER_URL || 'http://127.0.0.1:8080'
};

module.exports = {
  config: config
};
