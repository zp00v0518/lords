const { calcStorageNowValue } = require('../town/storage');
const fixingResultUpgradeMine = require('../region/mine/fixingResultUpgradeMine.js');
const fixingResultUpgrade_building = require('../town/buildings/fixingResultUpgrade_building');
const addValueToStorage = require('../town/storage/addValueToStorage.js');
const finishEvent = require('./finishEvent');
const { updateDB } = require("../workWithMongoDB");

const update = new updateDB();

function controlSatateEventsList(eventsList = []) {
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
      const x = eventItem.target.x;
      const y = eventItem.target.y;
      const sector = GlobalMap[serverName][x][y];
      if (type === 'upgradeRegion') {
        const storage = sector.town.storage;
        const mineX = eventItem.data.x;
        const mineY = eventItem.data.y;
        const mine = sector.region[mineX][mineY].sector;
        const previosValue = mine.work.addValue;
        calcStorageNowValue(storage, eventItem.end);
        fixingResultUpgradeMine(mine, eventItem);
        addValueToStorage(
          mine.type,
          mine.work.addValue - previosValue,
          storage
        );
        calcStorageNowValue(storage);
      } else if (type === 'upgradeTown') {
        let typeBuilding = eventItem.data.type;
        const townUpgrade = sector.town[typeBuilding];
        if (typeBuilding === 'storage') {
          finishEvent[typeBuilding](sector.town.storage, eventItem);
          const optionsForUpdate = {
            collectionName: eventItem.serverName,
            filtr: { _id: eventItem._id },
            updateDoc: { $set: { status: false } }
          };
          update.one(optionsForUpdate).then(result => {});
        } else if (typeBuilding === 'hall') {
          finishEvent[typeBuilding](
            sector.town[typeBuilding],
            eventItem,
            sector
          );
          const optionsForUpdate = {
            collectionName: eventItem.serverName,
            filtr: { _id: eventItem._id },
            updateDoc: { $set: { status: false } }
          };
          update.one(optionsForUpdate).then(result => {});
        } else if (typeBuilding.indexOf('barraks') !== -1) {
          finishEvent[typeBuilding](
            sector.town[typeBuilding],
            eventItem,
            sector
          );
          const optionsForUpdate = {
            collectionName: eventItem.serverName,
            filtr: { _id: eventItem._id },
            updateDoc: { $set: { status: false } }
          };
          update.one(optionsForUpdate).then(result => {});
        } else if (townUpgrade.work.static) {
          fixingResultUpgrade_building(townUpgrade, eventItem);
        }
      }
      i--;
    }
  }
  return eventsList;
}

module.exports = controlSatateEventsList;
