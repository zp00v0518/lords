const { findUserInGlobalMap } = require('./findUser.js');
const addNewUserToGlobalMap = require('./addNewUserToGlobalMap.js');
const { formEventsList } = require('../events');

function getInfoForStartGame(user, server, callback = function() {}) {
  // const { formEventsList} = tube;
  return new Promise((resolve, reject) => {
    findUserInGlobalMap(user._id, server)
      .then(findResult => {
        const findSectors = findResult.result;
        const infoForStartGame = {
          eventsList: [],
          sectors: []
        };
        if (findSectors.length === 0) {
          infoForStartGame.status = 'no_town';
          // addNewUserToGlobalMap(user, server)
          //   .then(sectorGlobalMap => {
          //     infoForStartGame.sectors.push(sectorGlobalMap);
          resolve(infoForStartGame);
          return callback(infoForStartGame);
        } else {
          formEventsList(user, server).then(eventsList => {
            //  нужно для того, чтобы в UserOnline.sectors хранились ссылки на обекты из GlobalMap
            const currentSectors = findSectors.map(sector => {
              return GlobalMap[server][sector.x][sector.y];
            });
            infoForStartGame.sectors = currentSectors;
            infoForStartGame.eventsList = eventsList;
            resolve(infoForStartGame);
            return callback(null, infoForStartGame);
          });
        }
      })
      .catch(err => {
        reject(err);
        return callback(err);
      });
  });
}

module.exports = getInfoForStartGame;
