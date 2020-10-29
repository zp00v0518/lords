const template = require('template_func');
const console = new template.Log(__filename);
const { calcStorageNowValue } = require('../town/storage');
const { getOneTownFromDB, updateStateTown } = require('../town');
const fixingResultUpgradeMine = require('../region/mine/fixingResultUpgradeMine.js');
const fixingResultUpgrade_building = require('../town/buildings/fixingResultUpgrade_building');
const finishEvent = require('./finishEvent');
const { updateDB } = require('../workWithMongoDB');
const eventType = require('./Event').types;
const eventsHandler = require('./eventsHandler');
const { recursiveLoop } = require('../template_modules');
const inActiveteEvent = require('./db/inActiveteEvent');
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

// есть ошибка в имплементации - не все обработчики вызывают resolve;
function iterationImplenetation(event, callback = () => {}) {
  return new Promise(async function(resolve, reject) {
    const now = new Date();
    const end = new Date(event.end);
    if (end > now) return resolve();
    const type = event.type;
    const serverName = event.serverName;
    const { target } = event;
    const x = target.x;
    const y = target.y;
    let sectorId = target.sector;
    let sector = {};
    if (!sectorId) {
      sector = global.GlobalMap[serverName][x][y];
      sectorId = sector._id;
    }
    try {
      sector = await getOneTownFromDB(serverName, sectorId);
      if (!sector) return resolve();
      if (type === eventType.upgradeRegion) {
        const storage = sector.town.storage;
        const mineX = event.data.x;
        const mineY = event.data.y;
        const mine = sector.region[mineX][mineY].sector;
        calcStorageNowValue(storage, event.end);
        const resultUpgradeMine = await fixingResultUpgradeMine(mine, event, sector);
        callback(null, resultUpgradeMine);
        return resolve(resultUpgradeMine);
      } else if (type === eventType.upgradeTown) {
        let typeBuilding = event.data.type;
        const townUpgrade = sector.town[typeBuilding];

        if (typeBuilding === 'storage') {
          finishEvent[typeBuilding](sector.town.storage, event);
        } else if (typeBuilding === 'hall') {
          finishEvent[typeBuilding](sector.town[typeBuilding], event, sector);
        } else if (typeBuilding.indexOf('barraks') !== -1) {
          finishEvent[typeBuilding](sector.town[typeBuilding], event, sector);
        } else if (townUpgrade.work.static) {
          const resultUpgradeBuilding = await fixingResultUpgrade_building(event, sector);
          callback(null, resultUpgradeBuilding);
          return resolve(resultUpgradeBuilding);
        }
        const resultInactiveteEvent = await inActiveteEvent(event);
        await updateStateTown(sector);
        callback(null, resultInactiveteEvent);
        return resolve(resultInactiveteEvent);
      } else if (type === eventType.hiringUnits) {
        const resultFinishEvent = await finishEvent[type](event, sector);
        await updateStateTown(sector);
        callback(null, resultFinishEvent);
        return resolve(resultFinishEvent);
      } else if (eventsHandler[type]) {
        await eventsHandler[type](event, sector);
        resolve();
      }
      // else if (type === eventType.battle) {
      //   await eventsHandler[type](event, sector);
      // } else if (type === eventType.backToTown) {
      //   eventsHandler[type](event, sector);
      // } else if (type === eventType.buildNewTown) {
      //   await eventsHandler[type](event);
      //   resolve();
      // } else if (type === eventType.heroTransfer) {
      //   await eventsHandler[type](event);
      //   resolve();
      // } else if (type === eventType.sendCaravan) {
      //   await eventsHandler[type](event);
      // } else if (type === eventType.caravanBackToTown) {
      //   await eventsHandler[type](event);
      // }
    } catch (err) {
      console.log(err);
      resolve();
    }
  });
}
