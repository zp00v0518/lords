const eventType = require('./Event').types;
const handlerEventBattle = require('../battle/handlerEventBattle');
const handlerBackToTown = require('../heroes/handlerBackToTown');
const { handlerBuildNewTown } = require('../town');

const eventsHandler = {
  [eventType.battle]: handlerEventBattle,
  [eventType.backToTown]: handlerBackToTown,
  [eventType.buildNewTown]: handlerBuildNewTown
};

module.exports = eventsHandler;
