const  mine = gameVariables.mine;

function checkUpgrade(building, sector) {
  const now = new Date().getTime();
  const upgradeTime = building.upgrade.date;
  if (now > upgradeTime) {
    building.upgrade.is = false;
    building.upgrade.date = 0;
    building.lvl++;
    if (mine.typeList.includes(building.type)){
      building.work.addValue =  building.lvl *  building.valueMining[building.type];
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
  storage[typeSource].addValue = value;
}