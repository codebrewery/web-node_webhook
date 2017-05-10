'use strict';

/**
 * Get the object data by dot notation
 * @param obj
 * @param str
 * @returns {*}
 */
function ref(obj, str) {
  return str.split('.').reduce((o, x)=> {
    return o[x];
  }, obj);
}

module.exports = {
  ref: ref
};
