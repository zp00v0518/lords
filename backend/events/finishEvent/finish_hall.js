import getParamsForFinish from './getParamsForFinish.js';
import calcStorageNowValue from '../../town/storage/calcStorageNowValue.js';
import upValueInStorage from '../../town/storage/upValueInStorage.js';

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

export default finishHall;
