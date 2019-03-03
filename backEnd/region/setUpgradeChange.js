const Mine = gameVariables.mine;
const tube = require('../tube.js');

function setUpgradeChange(cell, persent = 100, sector, info) {
  const { addEventToDB } = tube;
  // console.log("********** setUpgradeChange Work ************");
  const building = cell.sector;
  const lvl = building.lvl;
  const classInstance = building.class;
  const timeUpgrade = gameVariables[classInstance].getTimeUpgrade(lvl, persent);
  building.upgrade.is = true;
  building.upgrade.date = new Date().getTime() + timeUpgrade;
  sector.listUpgrade.push(cell);
  const dataForDB = {
    target: {
      sector: sector._id,
      user: info.player.user._id, 
    },
    init: {
      sector: sector._id,
      user: info.player.user._id, 
    },
    type: 'upgradeRegion',
    start: new Date().getTime(),
    end: building.upgrade.date,
    data: building
  };
  addEventToDB(dataForDB, info.server);
}

module.exports = setUpgradeChange;
