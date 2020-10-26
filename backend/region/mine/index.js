const Mine = require('./Mine.js');
const createMine = require('./createMine.js');
const methods = require('./methods');
const handlerStopMineEvent = require('./handlerStopMineEvent');

module.exports = {
  ...methods,
  Mine,
  createMine,
  handlerStopMineEvent
}