'use strict';

const validateSchema = require('express-jsonschema').validate;
const schemas = require('./validation-schemas.json');

function middleware(err, req, res, next) {
  if (err.name === 'JsonSchemaValidation') {
    let responseData = {
      statusText: 'Bad Request',
      validations: err.validations  // All of your validation information
    };
    if (req.is('json')) {
      return res.status(400).json(responseData);
    }
    res.status(400).send(responseData.statusText);

  } else {
    next(err);
  }
}

function validate(schema) {
  if (!schemas.hasOwnProperty(schema)) {
    throw new Error('Schema not found');
  }
  return validateSchema({body: schemas[schema]});
}

module.exports = {
  validate: validate,
  middleware: middleware
};
