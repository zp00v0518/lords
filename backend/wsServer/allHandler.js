import gameEvent from '../events/Event.js'
const evTypes = gameEvent.types;

export default {
  chatMessage: import('../chat/handlerChatMessage.js'),
  moveGlobalMap: import('../globalMap/moveGlobalMap.js'),
  upgradeRegion: import('../region/handlerResponseUpgradeRegion.js'),
  upgradeBuilding: import('../town/buildings/handlerResponseUpgradeBuilding'),
  choicesRace: import('../race/choicesRace'),
  buyUnits: import('../army/handlerBuyUnits'),
  mergeArmy: import('../army/handlerMergeArmy'),
  updateArmyOnRegion: import('../army/handlerUpdateArmyOnRegion'),
  battleRequest: import('../battle/handlerBattleRequest'),
  [evTypes.buildNewTown]: import('../town/handlerBuildNewTownRequest'),
  [evTypes.heroTransfer]: import('../town/handlerHeroTransferRequest'),
  [evTypes.sendCaravan]: import('../caravan/handlerSendCaravanRequest'),
  [evTypes.goToCoords]: import('../globalMap/handlerGoToCoordsRequest'),
  [evTypes.attackEnemyRegion]: import('../battle/handlerAttackEnemyRegionRequest')
};
