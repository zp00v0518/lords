module.exports = {
  chatMessage: require('../chat/handlerChatMessage.js'),
  moveGlobalMap: require('../globalMap/moveGlobalMap.js'),
  upgradeRegion: require('../region/handlerResponseUpgradeRegion.js'),
  upgradeBuilding: require('../town/buildings/handlerResponseUpgradeBuilding'),
  choicesRace: require('../race/choicesRace'),
  buyUnits: require('../army/handlerBuyUnits'),
  mergeArmy: require('../army/handlerMergeArmy'),
  battleRequest: require('../battle/handlerBattleRequest')
};
