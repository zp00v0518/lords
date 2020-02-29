// const Mine = gameVariables.mine;
const { addEventToDB } = require('../events');

function setUpgradeChange(cell, persent = 100, sector, info, callback = function() {}) {
  return new Promise((resolve, reject) => {
    const building = cell.sector;
    const lvl = building.lvl;
    const classInstance = building.class;
    const timeUpgrade = gameVariables[classInstance].getTimeUpgrade(lvl, persent);
    building.upgrade.is = true;
    building.upgrade.date = new Date().getTime() + timeUpgrade;
    const dataForDB = {
      target: {
        sector: sector._id,
        user: info.player.user._id,
        race: sector.town.race,
        x: sector.x,
        y: sector.y
      },
      init: {
        sector: sector._id,
        user: info.player.user._id,
        race: sector.town.race,
        x: sector.x,
        y: sector.y
      },
      type: 'upgradeRegion',
      start: new Date().getTime(),
      end: building.upgrade.date,
      data: building
    };
    addEventToDB(dataForDB, info.server)
      .then(() => {
        callback(null);
        return resolve();
      })
      .catch(err => {
        callback(err);
        return reject(err);
      });
  });
}

module.exports = setUpgradeChange;
