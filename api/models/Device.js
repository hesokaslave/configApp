/**
 * Device.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    udid : { type: 'string', unique : true },
    brand : { type : 'string' },
    isTablet : { type : 'boolean' },
    totalMemory : { type : 'number' },
    manufacturer : { type : 'string' },
    apiLevel : { type : 'number' },
    systemVersion : { type : 'string' },
  },
};
