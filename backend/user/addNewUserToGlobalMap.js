const { getRandomNumber } = require('template_func');
const tube = require('../tube.js');
const createTown = require('../town/createTown');
const { config, updateDB } = tube;
const WorldMap = require('../globalMap/WorldMap');
const update = new updateDB();

// добавляю нового Игрока на глобальную карту
function addNewUserToGlobalMap(user, serverName, callback = function() {}) {
  return new Promise((resolve, reject) => {
    checkUserPosition(serverName, (x, y, sectorId) => {
      const race = user.collections[serverName].race;
      const newTown = createTown({
        status: 'first',
        name: 'New Castle',
        sectorId,
        race
      });
      const { regionMap } = newTown;
      // удаляю т.к в базе получается дублирование карты региона
      delete newTown.regionMap;

      const optionsForUpdateBD = {
        collectionName: serverName,
        filtr: {
          x,
          y,
          class: config.schema.document.class.map
        },
        updateDoc: {
          $set: {
            region: regionMap,
            userId: user._id,
            type: WorldMap.types.town.id,
            nickName: user.nickName,
            town: newTown
          }
        }
      };
      update.one(optionsForUpdateBD).then(result => {
        GlobalMap[serverName][x][y].region = regionMap;
        GlobalMap[serverName][x][y].userId = user._id;
        GlobalMap[serverName][x][y].type = 1;
        GlobalMap[serverName][x][y].nickName = user.nickName;
        GlobalMap[serverName][x][y].town = newTown;
        callback(null, GlobalMap[serverName][x][y]);
        return resolve(GlobalMap[serverName][x][y]);
      });
    });
  });
}

// получения случайного региона и проверка на занятость другим игроком или памятником
function checkUserPosition(serverName, callback) {
  var x = getRandomNumber(gameVariables.numSectionGlobalMap - 1);
  var y = getRandomNumber(gameVariables.numSectionGlobalMap - 1);
  var region = GlobalMap[serverName][x][y];
  if (region.type !== 0) {
    return checkUserPosition(serverName, callback);
  } else {
    return callback(x, y, region._id);
  }
}
module.exports = addNewUserToGlobalMap;
