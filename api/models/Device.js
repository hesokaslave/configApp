/**
 * Device.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    brand : { type : 'string' },
    isTablet : { type : 'boolean' },
    totalMemory : { type : 'number' },
    manufacturer : { type : 'string' },
    apiLevel : { type : 'number' },
    systemVersion : { type : 'string' },
  },
};
