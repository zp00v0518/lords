import gameEvent from '../events/Event.js'
const evTypes = gameEvent.types;

export default {
  chatMessage: import('../chat/handlerChatMessage.js'),
  moveGlobalMap: import('../globalMap/moveGlobalMap.js'),
  upgradeRegion: import('../region/handlerResponseUpgradeRegion.js'),
  upgradeBuilding: import('../town/buildings/handlerResponseUpgradeBuilding.js'),
  choicesRace: import('../race/choicesRace.js'),
  buyUnits: import('../army/handlerBuyUnits/index.js'),
  mergeArmy: import('../army/handlerMergeArmy/index.js'),
  updateArmyOnRegion: import('../army/handlerUpdateArmyOnRegion/index.js'),
  battleRequest: import('../battle/handlerBattleRequest/index.js'),
  [evTypes.buildNewTown]: import('../town/handlerBuildNewTownRequest/index.js'),
  [evTypes.heroTransfer]: import('../town/handlerHeroTransferRequest/index.js'),
  [evTypes.sendCaravan]: import('../caravan/handlerSendCaravanRequest/index.js'),
  [evTypes.goToCoords]: import('../globalMap/handlerGoToCoordsRequest.js'),
  [evTypes.attackEnemyRegion]: import('../battle/handlerAttackEnemyRegionRequest/index.js')
};
