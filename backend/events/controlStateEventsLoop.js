const { calcStorageNowValue } = require('../town/storage');
const { getOneTownFromDB, updateStateTown } = require('../town');
const fixingResultUpgradeMine = require('../region/mine/fixingResultUpgradeMine.js');
const fixingResultUpgrade_building = require('../town/buildings/fixingResultUpgrade_building');
const finishEvent = require('./finishEvent');
const { updateDB } = require('../workWithMongoDB');
const eventType = require('./Event').types;
const { recursiveLoop } = require('../template_modules');
const update = new updateDB();

function controlStateEventsLoop(eventsList = [], callback = () => {}) {
  return new Promise((resolve, reject) => {
    if (eventsList.length === 0) {
      callback();
      return resolve();
    }
    recursiveLoop(0, eventsList, iterationImplenetation, (err, result) => {
      if (err) {
        callback();
        return reject(err);
      }
      callback(result);
      return resolve(result);
    });
  });
}

module.exports = controlStateEventsLoop;

function iterationImplenetation(event, callback = () => {}) {
  return new Promise((resolve, reject) => {
    const now = new Date();
    const end = new Date(event.end);
    if (end > now) return resolve();

    const type = event.type;
    const serverName = event.serverName;
    const x = event.target.x;
    const y = event.target.y;
    let sector = global.GlobalMap[serverName][x][y];
    const sectorId = sector._id;
    getOneTownFromDB(sectorId, serverName).then(res => {
      if (!res) return resolve();
      sector = res;
      if (type === eventType.upgradeRegion) {
        const storage = sector.town.storage;
        const mineX = event.data.x;
        const mineY = event.data.y;
        const mine = sector.region[mineX][mineY].sector;
        calcStorageNowValue(storage, event.end);
        fixingResultUpgradeMine(mine, event, sector)
          .then(result => {
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
        if (typeBuilding === 'storage') {
          finishEvent[typeBuilding](sector.town.storage, event);
        } else if (typeBuilding === 'hall') {
          finishEvent[typeBuilding](sector.town[typeBuilding], event, sector);
        } else if (typeBuilding.indexOf('barraks') !== -1) {
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
            updateStateTown(sector).then(() => {
              callback(null, result);
              return resolve(result);
            });
          })
          .catch(err => {
            callback(err);
            return reject(err);
          });
      } else if (type === eventType.hiringUnits) {
        finishEvent[type](event, sector)
          .then(result => {
            updateStateTown(sector).then(() => {
              callback(null, result);
              return resolve(result);
            });
          })
          .catch(err => {
            callback(err);
            return reject(err);
          });
      } else if (type === eventType.battle) {
        console.log(new Date(event.end))
      }
    });
  });
}
