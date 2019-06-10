const tube = require('../../tube.js');
const Town = require('../Town.js');
const Resources = gameVariables.resources;

function createStorage(listMine = gameVariables.mine.typeList, lvl = 1) {
  const { upgradeSection } = tube;
  //listMine - массив типов шахт;
  const storage = {
    // type: Town.listBuilding[0], // надо будет удалить
    lvl: lvl,
    class: gameVariables.classInstance.storage,
    upgrade: upgradeSection(),
    maxValue: {
      gold: Resources.maxValue.gold,
      baseResource: Resources.maxValue.baseResource,
      unicResource: Resources.maxValue.unicResource
    },
    sources: {}
  };
  Object.assign(storage, Town.baseBuilding);
  //создаются поля, которые соответствуют перечню шахт
  for (let i = 0; i < listMine.length; i++) {
    const type = listMine[i];
    const obj = {
      lastCalc: 0,
      addValue: 0,
      nowValue: 0
    };
    storage.sources[type] = obj;
    if (type === 'gold') {
      storage.sources.gold.nowValue = 50000;
      storage.sources.gold.addValue = 2000;
      storage.sources.gold.lastCalc = new Date();
      storage.sources.gold.maxValue = Resources.maxValue.gold;
    }
  }
  Resources.baseResource.forEach(item => {
    storage.sources[item].maxValue = Resources.maxValue.baseResource;
  });
  Resources.unicResource.forEach(item => {
    storage.sources[item].maxValue = Resources.maxValue.unicResource;
  });
  return storage;
}

module.exports = createStorage;
