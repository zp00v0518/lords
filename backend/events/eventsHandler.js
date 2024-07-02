import gameEvent from './Event.js';
const eventType = gameEvent.types
import handlerEventBattle from '../battle/handlerEventBattle.js';
import handlerBackToTown from '../heroes/handlerBackToTown.js';
const { handlerBuildNewTown, handlerHeroTransferEvent } = require('../town');
const handlerSendCaravanEvent = require('../caravan/handlerSendCaravanEvent');
const handlerCaravanBackToTownEvent = require('../caravan/handlerCaravanBackToTownEvent');
const handlerStopMineEvent = require('../region/mine/handlerStopMineEvent');

const eventsHandler = {
  [eventType.battle]: handlerEventBattle,
  [eventType.backToTown]: handlerBackToTown,
  [eventType.buildNewTown]: handlerBuildNewTown,
  [eventType.heroTransfer]: handlerHeroTransferEvent,
  [eventType.sendCaravan]: handlerSendCaravanEvent,
  [eventType.caravanBackToTown]: handlerCaravanBackToTownEvent,
  [eventType.stopMine]: handlerStopMineEvent
};

module.exports = eventsHandler;
