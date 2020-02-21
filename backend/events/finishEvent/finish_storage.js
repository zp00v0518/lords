const Resources = require('../../resources/Resources');
const getParamsForFinish = require('./getParamsForFinish');

function finishStorage(storage, eventData) {
  const { buildingInfo, nextLvl } = getParamsForFinish(eventData);
  const maxValue = buildingInfo.lvl[nextLvl].maxValue;
  const inStorage = storage.sources;
  storage.lvl = buildingInfo.lvl[nextLvl] ? nextLvl : storage.lvl;
  storage.upgrade.is = false;
  storage.maxValue = maxValue;
  Object.keys(inStorage).forEach(nameSource => {
    const item = inStorage[nameSource];
    if (Resources.unicResource.includes(nameSource)) {
      item.maxValue = maxValue.unicResource;
      return;
    } else if (Resources.baseResource.includes(nameSource)) {
      item.maxValue = maxValue.baseResource;
      return;
    } else {
      item.maxValue = maxValue.gold;
    }
  });
}

module.exports = finishStorage;
