const Mine = gameVariables.mine;
// const checkWorkBuilding = require("../tube.js").checkWorkBuilding;

function setUpgradeChange(cell, persent = 100, sector) {
  // console.log("********** setUpgradeChange Work ************");
  const building = cell.sector;
  const lvl = building.lvl;
  const classInstance = building.class;
  const timeUpgrade = gameVariables[classInstance].getTimeUpgrade(lvl, persent);
  building.upgrade.is = true;
  building.upgrade.date = new Date().getTime() + timeUpgrade;
  sector.listUpgrade.push(cell);
  // checkWorkBuilding(building, type,  building[type].upgrade.date);
}

module.exports = setUpgradeChange;
