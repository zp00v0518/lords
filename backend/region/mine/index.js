const Mine = require('./Mine.js');
const createMine = require('./createMine.js');
const methods = require('./methods');

module.exports = {
  ...methods,
  Mine,
  createMine
}