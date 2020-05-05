const eventType = require('./Event').types;
const handlerEventBattle = require('../battle/handlerEventBattle');
const handlerBackToTown = require('../heroes/handlerBackToTown');
const { handlerBuildNewTown, handlerHeroTransferEvent } = require('../town');
const handlerSendCaravanEvent = require('../caravan/handlerSendCaravanEvent');

const eventsHandler = {
  [eventType.battle]: handlerEventBattle,
  [eventType.backToTown]: handlerBackToTown,
  [eventType.buildNewTown]: handlerBuildNewTown,
  [eventType.heroTransfer]: handlerHeroTransferEvent,
  [eventType.sendCaravan]: handlerSendCaravanEvent
};

module.exports = eventsHandler;
