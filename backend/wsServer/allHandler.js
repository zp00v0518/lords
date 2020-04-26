const evTypes = require('../events/Event').types;

module.exports = {
  chatMessage: require('../chat/handlerChatMessage.js'),
  moveGlobalMap: require('../globalMap/moveGlobalMap.js'),
  upgradeRegion: require('../region/handlerResponseUpgradeRegion.js'),
  upgradeBuilding: require('../town/buildings/handlerResponseUpgradeBuilding'),
  choicesRace: require('../race/choicesRace'),
  buyUnits: require('../army/handlerBuyUnits'),
  mergeArmy: require('../army/handlerMergeArmy'),
  updateArmyOnRegion: require('../army/handlerUpdateArmyOnRegion'),
  battleRequest: require('../battle/handlerBattleRequest'),
  [evTypes.buildNewTown]: require('../town/handlerBuildNewTownRequest'),
  [evTypes.heroTransfer]: require('../town/handlerHeroTransferRequest')
};
