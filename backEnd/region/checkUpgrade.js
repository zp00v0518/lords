const  mine = gameVariables.mine;
const { calcStorageNowValue } = require('../tube.js');

function checkUpgrade(cell, sector) {
  const now = new Date().getTime();
  const building = cell.sector;
  const upgradeTime = building.upgrade.date;
  if (now > upgradeTime) {
    building.upgrade.is = false;
    building.upgrade.date = 0;
    building.lvl++;
    if (mine.typeList.includes(building.type)){
      building.work.addValue =  building.lvl *  mine.valueMining[building.type];
      if (sector){
        addValueToStorage(building.type,building.work.addValue, sector )
      }
    }
    return true;
  }
  return false;
};

module.exports = checkUpgrade;

function addValueToStorage(typeSource, value, sector){
  const storage = sector.town.storage;
  if (storage.sources[typeSource].lastCalc === 0) {
    storage.sources[typeSource].lastCalc = new Date().getTime();
    storage.sources[typeSource].addValue = value;
    calcStorageNowValue(storage);
  } else {
    calcStorageNowValue(storage);
    storage.sources[typeSource].addValue = value;
  }
}