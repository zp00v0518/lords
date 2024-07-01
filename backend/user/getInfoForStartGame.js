import { findUserInGlobalMap } from './findUser.js';
import { getHeroesFromDB } from '../heroes/db/index.js';
import formEventsList from '../events/formEventsList.js';

function getInfoForStartGame(user, server, callback = function () { }) {
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
          // логика добавления нового юзера перенесаны в choicesRace
          // addNewUserToGlobalMap(user, server)
          //   .then(sectorGlobalMap => {
          //     infoForStartGame.sectors.push(sectorGlobalMap);
          resolve(infoForStartGame);
          return callback(infoForStartGame);
        } else {
          getHeroesFromDB(server, { userId: user._id }).then(resultFindHero => {
            formEventsList(user._id, server).then(eventsList => {
              //  нужно для того, чтобы в UserOnline.sectors хранились ссылки на обекты из GlobalMap
              const currentSectors = findSectors.map(sector => {
                // return GlobalMap[server][sector.x][sector.y];
                return sector;
              });
              infoForStartGame.sectors = currentSectors;
              infoForStartGame.eventsList = eventsList;
              infoForStartGame.heroesList = resultFindHero.result;
              resolve(infoForStartGame);
              return callback(null, infoForStartGame);
            });
          });
        }
      })
      .catch(err => {
        reject(err);
        return callback(err);
      });
  });
}

export default getInfoForStartGame;
