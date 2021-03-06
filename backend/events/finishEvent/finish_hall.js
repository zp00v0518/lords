const getParamsForFinish = require('./getParamsForFinish');
const calcStorageNowValue = require('../../town/storage/calcStorageNowValue');
const upValueInStorage = require('../../town/storage/upValueInStorage');

function finishHall(hall, eventData, sector) {
  const { buildingInfo, nextLvl } = getParamsForFinish(eventData);
  const storage = sector.town.storage;
  const nextBuilding = buildingInfo.lvl[nextLvl];
  hall.lvl = buildingInfo.lvl[nextLvl] ? nextLvl : hall.lvl;
  calcStorageNowValue(storage);
  // const gold = storage.sources.gold;
  const prevValue = buildingInfo.lvl[nextLvl - 1]
    ? buildingInfo.lvl[nextLvl - 1].effect.gold
    : 0;
  const effect = nextBuilding.effect.gold;
  const different = effect - prevValue;
  upValueInStorage('gold', different, storage);
  // gold.addValue += different;
  hall.upgrade.is = false;
  return hall;
}

module.exports = finishHall;
