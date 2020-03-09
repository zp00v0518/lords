const eventType = require('./Event').types;
const handlerEventBattle = require('../battle/handlerEventBattle');
const handlerBackToTown = require('../heroes/handlerBackToTown');

const eventsHandler = {
  [eventType.battle]: handlerEventBattle,
  [eventType.backToTown]: handlerBackToTown
};

module.exports = eventsHandler;
