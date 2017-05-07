'use strict';

const jwt = require('jsonwebtoken');
const router = require('express').Router();
const logger = require('../../utils/logger').getLogger();
const validate = require('../../utils/api-validation').validate;
const config = require('../../config').config;

router.post('/login/', validate('login'), (req, res) => {
  if (req.body.token !== config.token) {
    return res.status(401).json({response: 'unauthorized'});
  }

  let profile = {
    app: req.body.app,
    ip: req.ip
  };

  let token = jwt.sign(profile, config.secret, {expiresIn: config.secretExpiry});

  logger.debug('New client login', profile);

  res.json({token: token});
});

module.exports = router;
