'use strict';

const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger').getLogger();
const defaultConfig = require('../hooks.json');

function fetchConfig(name) {
  let basePath = path.dirname(__filename);
  let jsonPath = path.join(basePath, '../../', `${name}.json`);

  // Detect in the project root
  try {
    if (fs.existsSync(jsonPath)) {
      return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    }
  } catch(e) {
    logger.info('No hook config found in project root.');
  }
  

  // Detect in the user root
  try {
    if (fs.existsSync(process.env.HOME)) {
      return JSON.parse(fs.readFileSync(process.env.HOME, 'utf8'));
    }
  } catch(e) {
    logger.info('No hook config found in home directory.');
  }

  // Failover the src root
  return defaultConfig;
}

module.exports = {
  fetchConfig: fetchConfig
};
