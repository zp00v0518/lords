// const Mine = gameVariables.mine;
const tube = require('../tube.js');

function setUpgradeChange( cell, persent = 100,  sector, info,  callback = function() {}) {
  const { addEventToDB } = tube;
  return new Promise((resolve, reject) => {
    const building = cell.sector;
    const lvl = building.lvl;
    const classInstance = building.class;
    const timeUpgrade = gameVariables[classInstance].getTimeUpgrade(
      lvl,
      persent
    );
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
      .then(result => {
        // const addEvent = result.ops[0];
        // info.player.eventsList.push(addEvent);
        // info.player.eventsList.sort((a,b) => {
        //   return a.end - b.end;
        // })
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
