import Mine from './Mine.js';
import createMine from './createMine.js';
import methods from './methods/index.js';
import handlerStopMineEvent from './handlerStopMineEvent.js';

module.exports = {
  ...methods,
  Mine,
  createMine,
  handlerStopMineEvent
}

export {
  methods,
  Mine,
  createMine,
  handlerStopMineEvent
}