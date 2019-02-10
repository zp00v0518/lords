const Mine = gameVariables.mine;
// const checkWorkBuilding = require("../tube.js").checkWorkBuilding;

function setUpgradeChange(building, persent = 100, sector){
			// console.log("********** setUpgradeChange Work ************");
			const lvl = building.lvl;
      const timeUpgrade = Mine.getTimeUpgrade(lvl, persent);
			 building.upgrade.is = true;
			 building.upgrade.date = new Date().getTime() + timeUpgrade;
			 sector.listUpgrade.push(building)
			// checkWorkBuilding(building, type,  building[type].upgrade.date);
}

module.exports = setUpgradeChange;