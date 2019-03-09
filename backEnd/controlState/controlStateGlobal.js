const serverList = gameVariables.serverList;
const {
  calcStorageNowValue,
  controlSatateEventsList
} = require('../tube.js');

function controlStateGlobal(param) {
  if (param.target === 'all') {
    serverList.forEach(item => {
      const userServer = item.collectionName;
      Object.keys(UserOnline[userServer]).forEach(key => {
        if (key === 'count') return;
        const userInOnline = UserOnline[userServer][key];
        const sectors = userInOnline.sectors;
        const ws = userInOnline.ws;
        controlSatateEventsList(userInOnline.eventsList);
        sectors.forEach(sector => {
          calcStorageNowValue(sector.town.storage);
        });
        const response = {
          type: 'controlState',
          status: true,
          sectors: sectors,
          eventsList: userInOnline.eventsList
        };
        ws.send(JSON.stringify(response));
      });
    });
  }
}

module.exports = controlStateGlobal;
