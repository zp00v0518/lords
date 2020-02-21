const { calcStorageNowValue } = require("../town/storage");
const fixingResultUpgradeMine = require("../region/mine/fixingResultUpgradeMine.js");
const fixingResultUpgrade_building = require("../town/buildings/fixingResultUpgrade_building");
const addValueToStorage = require("../town/storage/addValueToStorage.js");
const finishEvent = require("./finishEvent");
const { updateDB } = require("../workWithMongoDB");
const eventType = require("./Event").types;
const update = new updateDB();

function newControl(eventsList = [], callback = () => {}) {
  return new Promise((resolve, reject) => {
    if (eventsList.length === 0) {
      callback();
      return resolve();
    }
    controlIteration(0, eventsList, (err, result) => {
      if (err) {
        callback();
        return reject();
      }
      callback(result);
      return resolve(result);
    });
  });
}

module.exports = newControl;

function controlIteration(index, arr, callback) {
  if (index === arr.length) {
    callback(null, arr);
    return;
  }
  const event = arr[index];
  iterationImplenetation(event).then(() => {
    index++;
    controlIteration(index, arr, callback);
  });
}

function iterationImplenetation(event) {
  return new Promise((resolve, reject) => {
    const now = new Date();
    const end = new Date(event.end);
    if (end > now) {
      return resolve();
    }
    const type = event.type;
    const serverName = event.serverName;
    const x = event.target.x;
    const y = event.target.y;
    const sector = GlobalMap[serverName][x][y];
    if (type === eventType.upgradeRegion) {
      const storage = sector.town.storage;
      const mineX = event.data.x;
      const mineY = event.data.y;
      const mine = sector.region[mineX][mineY].sector;
      const previosValue = mine.work.addValue;
      calcStorageNowValue(storage, event.end);
      fixingResultUpgradeMine(mine, event)
        .then(result => {
          addValueToStorage(
            mine.type,
            mine.work.addValue - previosValue,
            storage
          );
          callback(null, result);
          return resolve(result);
        })
        .catch(err => {
          callback(err);
          return reject(err);
        });
    } else if (type === eventType.upgradeTown) {
      let typeBuilding = event.data.type;
      const townUpgrade = sector.town[typeBuilding];
      const optionsForUpdate = {
        collectionName: serverName,
        updateDoc: { $set: { status: false } },
        filtr: { _id: event._id }
      };
      if (typeBuilding === "storage") {
        finishEvent[typeBuilding](sector.town.storage, event);
      } else if (typeBuilding === "hall") {
        finishEvent[typeBuilding](sector.town[typeBuilding], event, sector);
      } else if (typeBuilding.indexOf("barraks") !== -1) {
        finishEvent[typeBuilding](sector.town[typeBuilding], event, sector);
      } else if (townUpgrade.work.static) {
        fixingResultUpgrade_building(townUpgrade, event)
          .then(result => {
            callback(null, result);
            return resolve(result);
          })
          .catch(err => {
            callback(err);
            return reject(err);
          });
      }
      update
        .one(optionsForUpdate)
        .then(result => {
          callback(null, result);
          return resolve(result);
        })
        .catch(err => {
          callback(err);
          return reject(err);
        });
    } else if (type === eventType.hiringUnits) {
      finishEvent[type](event, sector)
        .then(result => {
          callback(null, result);
          return resolve(result);
        })
        .catch(err => {
          callback(err);
          return reject(err);
        });
    }
  });
}
