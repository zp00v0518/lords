const serverList = global.gameVariables ? global.gameVariables.serverList : [];
import { formEventsList, controlStateEventsList } from '../events/index.js';
import { globalControlStateInTown, getUsersTownFromDB } from '../town/index.js';
import { sendWSMessage } from '../wsServer/index.js';
import { getHeroesFromDB } from '../heroes/db/index.js';

function controlStateGlobal(param) {
  if (param.target === 'all') {
    serverList.forEach((item) => {
      const userServer = item.collectionName;
      globalControlStateInTown(userServer).then((resultStateSectors) => {
        controlStateEventsList(userServer).then((res) => {
          Object.keys(global.UserOnline[userServer]).forEach((key) => {
            if (key === 'count') return;
            const userInOnline = global.UserOnline[userServer][key];
            const ws = userInOnline.ws;
            // globalControlStateInTown(userServer).then(resultStateSectors => {
            //   controlStateEventsList(userServer).then(res => {
            formEventsList(userInOnline.user._id, userServer).then((listEvents) => {
              getUsersTownFromDB(userInOnline.user._id, userServer).then((listSectors) => {
                getHeroesFromDB(userServer, { userId: userInOnline.user._id }).then((heroesList) => {
                  userInOnline.sectors = JSON.parse(JSON.stringify(listSectors));
                  userInOnline.heroesList = JSON.parse(JSON.stringify(heroesList.result));
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

            //   });
            // });
          });
        });
      });
    });
  }
}

export default controlStateGlobal 
