'use strict';

const router = require('express').Router({mergeParams: true});
const hookHandler = require('../../utils/hook');
const logger = require('../../utils/logger').getLogger();

router.post('/:hookId/', (req, res) => {
  logger.info(req, 'incoming request', JSON.stringify(req.body));

  hookHandler.handle(req, req.params.hookId, (err, message)=> {
    if (err) {
      return res.status(404).json({err: err});
    }
    res.status(200).json({text: message});
  });
});

module.exports = router;
