const serverList = gameVariables.serverList;
const { checkUpgrade, calcStorageNowValue, config } = require('../tube.js');

function controlStateGlobal(param) {
  if (param.target === 'all') {
    serverList.forEach(item => {
      const userServer = item.collectionName;
      Object.keys(UserOnline[userServer]).forEach(key => {
        if (key === 'count') return;
        const userInOnline = UserOnline[userServer][key];
        const sectors = userInOnline.sectors;
        const ws = userInOnline.ws;
        sectors.forEach(sector => {
          sector.listUpgrade.forEach((upgradeBuilding, index) => {
            if (checkUpgrade(upgradeBuilding, sector)) {
              sector.listUpgrade.splice(index, 1);
            }
          });
          calcStorageNowValue(sector.town.storage);
        });
        const response = {
          type: 'controlState',
          status: true,
          sectors: sectors
        };
        ws.send(JSON.stringify(response));
      });
    });
  }
}

module.exports = controlStateGlobal;
