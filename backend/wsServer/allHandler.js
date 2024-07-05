import gameEvent from '../events/Event.js'
const evTypes = gameEvent.types;

import chatMessage from '../chat/handlerChatMessage.js';
import moveGlobalMap from '../globalMap/moveGlobalMap.js';
import upgradeRegion from '../region/handlerResponseUpgradeRegion.js';
import upgradeBuilding from '../town/buildings/handlerResponseUpgradeBuilding.js';
import choicesRace from '../race/choicesRace.js';
import buyUnits from '../army/handlerBuyUnits/index.js';
import mergeArmy from '../army/handlerMergeArmy/index.js';
import updateArmyOnRegion from '../army/handlerUpdateArmyOnRegion/index.js';
import battleRequest from '../battle/handlerBattleRequest/index.js';
import handlerBuildNewTownRequest from '../town/handlerBuildNewTownRequest/index.js';
import handlerHeroTransferRequest from '../town/handlerHeroTransferRequest/index.js';
import handlerSendCaravanRequest from '../caravan/handlerSendCaravanRequest/index.js';
import handlerGoToCoordsRequest from '../globalMap/handlerGoToCoordsRequest.js';
import handlerAttackEnemyRegionRequest from '../battle/handlerAttackEnemyRegionRequest/index.js';

export default {
  chatMessage,
  moveGlobalMap,
  upgradeRegion,
  upgradeBuilding,
  choicesRace,
  buyUnits,
  mergeArmy,
  updateArmyOnRegion,
  battleRequest,
  [evTypes.buildNewTown]: handlerBuildNewTownRequest,
  [evTypes.heroTransfer]: handlerHeroTransferRequest,
  [evTypes.sendCaravan]: handlerSendCaravanRequest,
  [evTypes.goToCoords]: handlerGoToCoordsRequest,
  [evTypes.attackEnemyRegion]: handlerAttackEnemyRegionRequest
};
