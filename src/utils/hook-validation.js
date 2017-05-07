'use strict';

function ref(obj, str) {
  return str.split('.').reduce(function (o, x) {
    return o[x];
  }, obj);
}

function getValue(request, config) {
  if (!config.hasOwnProperty('parameter')) {
    return false;
  }

  if (config.parameter.source === 'payload') {
    return ref(request, config.parameter.name);
  }
  return '';
}

function match(request, config) {
  if (config.type === 'value') {
    return config.value === getValue(request, config);
  }
  return true;
}

function validate(request, config) {
  for (let rule in config['trigger-rule']) {
    if (rule === 'match') {
      return match(request, config['trigger-rule'][rule]);
    }
  }
  return true;
}

module.exports = {
  validate: validate
};
