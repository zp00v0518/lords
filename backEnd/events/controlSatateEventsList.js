const { checkUpgrade, calcStorageNowValue } = require('../tube.js');
const fixingResultUpgradeMine = require('../region/mine/fixingResultUpgradeMine.js');
const addValueToStorage = require('../town/storage/addValueToStorage.js');

function controlSatateEventsList(eventsList = []) {
  // console.log("***controlSatateEventsList work***")
  if (eventsList.length === 0) return eventsList;
  for (let i = 0; i < eventsList.length; i++) {
    const item = eventsList[i];
    const now = new Date();
    const end = new Date(item.end);
    if (end > now) {
      break;
    } else {
      const eventItem = eventsList.splice(i, 1)[0];
      const type = eventItem.type;
      const serverName = eventItem.serverName;
      if (type === 'upgradeRegion') {
        const x = eventItem.target.x;
        const y = eventItem.target.y;
        const sector = GlobalMap[serverName][x][y];
        const storage = sector.town.storage;
        const mineX = eventItem.data.x;
        const mineY = eventItem.data.y;
        const mine = sector.region[mineX][mineY].sector;
        const previosValue = mine.work.addValue;
        calcStorageNowValue(storage, eventItem.end);
        fixingResultUpgradeMine(mine, eventItem);
        addValueToStorage(mine.type, mine.work.addValue - previosValue, storage);
        calcStorageNowValue(storage);
      }
      i--;
    }
  }
  return eventsList;
}

module.exports = controlSatateEventsList;
