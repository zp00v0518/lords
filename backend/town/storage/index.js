const createStorage = require('./createStorage.js');
const upgradeSection = require('../upgradeSection.js');
const calcStorageNowValue = require('./calcStorageNowValue.js');
const upValueInStorage = require('./upValueInStorage');
const addValueToStorage = require('./addValueToStorage');
const methods = require('./methods');

module.exports = {
  createStorage,
  upgradeSection,
  calcStorageNowValue,
  upValueInStorage,
  addValueToStorage,
  ...methods
};
