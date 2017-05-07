'use strict';

const fs = require('fs');
const path = require('path');
const defaultConfig = require('../hooks.json');

function fetchConfig(name) {
  let basePath = path.dirname(__filename);
  let jsonPath = path.join(basePath, '../../', `${name}.json`);

  // Detect in the project root
  if (fs.existsSync(jsonPath)) {
    return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  }

  // Detect in the user root
  if (fs.existsSync(process.env.HOME)) {
    return JSON.parse(fs.readFileSync(process.env.HOME, 'utf8'));
  }

  // Failover the src root
  return defaultConfig;
}

module.exports = {
  fetchConfig: fetchConfig
};
