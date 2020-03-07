const eventType = require('./Event').types;
const handlerEventBattle = require('../battle/handlerEventBattle');

const eventsHandler = {
  [eventType.battle]: handlerEventBattle
};

module.exports = eventsHandler;
