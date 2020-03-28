const serverList = global.gameVariables.serverList;
const { formEventsList, controlStateEventsList } = require('../events');
const { globalControlStateInTown, getUsersTownFromDB } = require('../town');
const { sendWSMessage } = require('../wsServer');
const { getHeroesFromDB } = require('../heroes/db');

function controlStateGlobal(param) {
  if (param.target === 'all') {
    serverList.forEach(item => {
      const userServer = item.collectionName;
      Object.keys(global.UserOnline[userServer]).forEach(key => {
        if (key === 'count') return;
        const userInOnline = global.UserOnline[userServer][key];
        const ws = userInOnline.ws;
        globalControlStateInTown(userServer).then(resultStateSectors => {
          controlStateEventsList(userServer).then(res => {
            formEventsList(userInOnline.user._id, userServer).then(listEvents => {
              getUsersTownFromDB(userInOnline.user._id, userServer).then(listSectors => {
                getHeroesFromDB(userServer, { userId: userInOnline.user._id }).then(heroesList => {
                  userInOnline.sectors = JSON.parse(JSON.stringify(listSectors));
                  const response = {
                    type: 'controlState',
                    status: true,
                    sectors: listSectors,
                    eventsList: listEvents,
                    heroesList: heroesList.result
                  };
                  sendWSMessage(ws, response);
                });
              });
            });
          });
        });
      });
    });
  }
}

module.exports = controlStateGlobal;
