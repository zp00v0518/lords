const eventType = require('./Event').types;
const handlerEventBattle = require('../battle/handlerEventBattle');
const handlerBackToTown = require('../heroes/handlerBackToTown');
const { handlerBuildNewTown, handlerHeroTransferEvent } = require('../town');
const handlerSendCaravanEvent = require('../caravan/handlerSendCaravanEvent');
const handlerCaravanBackToTownEvent = require('../caravan/handlerCaravanBackToTownEvent');

const eventsHandler = {
  [eventType.battle]: handlerEventBattle,
  [eventType.backToTown]: handlerBackToTown,
  [eventType.buildNewTown]: handlerBuildNewTown,
  [eventType.heroTransfer]: handlerHeroTransferEvent,
  [eventType.sendCaravan]: handlerSendCaravanEvent,
  [eventType.caravanBackToTown]: handlerCaravanBackToTownEvent
};

module.exports = eventsHandler;
