import gameEvent from './Event.js';
const eventType = gameEvent.types
import handlerEventBattle from '../battle/handlerEventBattle.js';
import handlerBackToTown from '../heroes/handlerBackToTown.js';
import { handlerBuildNewTown, handlerHeroTransferEvent } from '../town/index.js';
import { handlerSendCaravanEvent } from '../caravan/handlerSendCaravanEvent/index.js';
import handlerCaravanBackToTownEvent from '../caravan/handlerCaravanBackToTownEvent/index.js';
import handlerStopMineEvent from '../region/mine/handlerStopMineEvent.js';

const eventsHandler = {
  [eventType.battle]: handlerEventBattle,
  [eventType.backToTown]: handlerBackToTown,
  [eventType.buildNewTown]: handlerBuildNewTown,
  [eventType.heroTransfer]: handlerHeroTransferEvent,
  [eventType.sendCaravan]: handlerSendCaravanEvent,
  [eventType.caravanBackToTown]: handlerCaravanBackToTownEvent,
  [eventType.stopMine]: handlerStopMineEvent
};

export default eventsHandler;
