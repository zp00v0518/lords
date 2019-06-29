const race = require('../../race').Race;
const listBuildings = require('../../town/Town').listBuildings;
const Resources = require('../../resources/Resources');

function finishStorage(storage, eventData) {
  const indexRace = eventData.init.race;
  const raceName = race.typeList[indexRace];
  const storageName = listBuildings.storage.name;
  const nextLvl = eventData.data.nextLvl;
  const maxValue = race[raceName].buildings[storageName].lvl[nextLvl].maxValue;
  const inStorage = storage.sources;
  storage.lvl = nextLvl;
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
