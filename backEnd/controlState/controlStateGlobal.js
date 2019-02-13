const serverList = gameVariables.serverList;
const { checkUpgrade, calcStorageNowValue, config} = require("../tube.js");

function controlStateGlobal(param) {
  if (param.target === "all") {
    serverList.forEach(item => {
      const userServer = item.collectionName;
      Object.keys(UserOnline[userServer]).forEach(key => {
        const userInOnline = UserOnline[userServer][key];
        const sectors = userInOnline.sectors;
        const ws = userInOnline.ws;
        sectors.forEach(sector => {
          sector.listUpgrade.forEach(upgradeBuilding => {
            checkUpgrade(upgradeBuilding, sector);
          });
          calcStorageNowValue(sector.town.storage);
				});
				const response = {
					type: 'changeSectors',
					status: true,
					sectors: sectors,
				}
				ws.send(JSON.stringify(response))
      });
    });
  }
}

module.exports = controlStateGlobal;


// function startControl() {
//   const flag = config.db.check;
//   if (flag) {
//     constractGlobalMap();
//   } else {
//     setTimeout(startConstractMap, 300);
//   }
// }
// startConstractMap();