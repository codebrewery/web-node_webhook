'use strict';

function ref(obj, str) {
  return str.split('.').reduce(function (o, x) {
    return o[x];
  }, obj);
}

function replace(argument, config) {
  let reg = new RegExp(config.replace.char, 'g');
  return argument.replace(reg, config.replace.with);
}

function payload(request, config) {
  let arg = ref(request, config.name) || '';

  if (config.hasOwnProperty('replace')) {
    return replace(arg, config);
  }

  return arg;
}

function getArguments(request, config) {
  if (!config.hasOwnProperty('pass-arguments-to-command')) {
    return [];
  }

  return config['pass-arguments-to-command'].map((arg)=> {
    if (arg.source === 'payload') {
      return payload(request, arg);
    }
    return '';
  });
}

module.exports = {
  getArguments: getArguments
};
