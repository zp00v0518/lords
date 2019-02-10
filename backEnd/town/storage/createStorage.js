const tube = require("../../tube.js");
const Town = require("../Town.js");

function createStorage(listMine = gameVariables.mine.typeList, lvl = 0) {
  const { upgradeSection } = tube;
  //listMine - массив типов шахт;
  const storage = {
    type: Town.listBuilding[0],
    lvl: lvl,
    upgrade: upgradeSection(),
    maxValue: {
      gold: 100000,
      baseResource: 18,
      unicResource: 10
    },
    sources: {}
  };
  Object.assign(storage, Town.baseBuilding)
  //создаются поля, которые соответствуют перечню шахт
  for (let i = 0; i < listMine.length; i++) {
    const type = listMine[i];
    const obj = {
      lastCalc: 0,
      addValue: 0,
      nowValue: 0
    };
    storage.sources[type] = obj;
    if (type === "gold") {
      storage.sources.gold.nowValue = 50000;
    }
  }
  return storage;
}

module.exports = createStorage;
