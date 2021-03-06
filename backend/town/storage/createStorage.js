// const tube = require('../../tube.js');
const gameVariables = require('../../variables/game_variables');
const Town = require('../Town.js');
const upgradeSection = require('../upgradeSection');
// const Resources = gameVariables.resources;
const { Resources } = require('../../resources');
const { Mine } = require('../../region/mine');
const workSection = require('..//buildings/workSection');

function createStorage({ listMine = Mine.typeList, lvl = 1, status = 'not_first' }) {
  // const { upgradeSection } = tube;
  //listMine - массив типов шахт;
  const storage = {
    // type: Town.listBuilding[0], // надо будет удалить
    lvl: lvl,
    class: gameVariables.classInstance.storage,
    type: gameVariables.classInstance.storage,
    upgrade: upgradeSection(),
    work: workSection({}),
    maxValue: {
      gold: Resources.maxValue.gold,
      baseResource: Resources.maxValue.baseResource,
      unicResource: Resources.maxValue.unicResource
    },
    sources: {}
  };
  Object.assign(storage, Town.baseBuilding);
  // создаются поля, которые соответствуют перечню шахт
  for (let i = 0; i < listMine.length; i++) {
    const type = listMine[i];
    const obj = {
      lastCalc: 0,
      addValue: 0,
      // nowValue: 0
      nowValue: status === 'first' ? 20 : 0
    };
    storage.sources[type] = obj;
    if (type === 'gold') {
      storage.sources.gold.nowValue = status === 'first' ? 50000 : 5000;
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
