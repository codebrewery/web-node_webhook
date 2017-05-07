'use strict';

const config = {
  // Change this value to identical for both the server and client
  token: process.env.APP_TOKEN || 'CHANGE-ME',

  // Client
  app: process.env.APP || 'default', // Change this to the id of your app, which will show in logs
  serverURL: process.env.SERVER_URL || 'http://127.0.0.1:8080',

  // Server
  secret: process.env.SECRET || 'QA1KPVPanMvtgf0otsie4pRqS1M_wffvqUd1g',
  secretExpiry: process.env.SECRET_EXPIRY || 60, // Seconds
  port: process.env.PORT || '8080'
};

module.exports = {
  config: config
};
