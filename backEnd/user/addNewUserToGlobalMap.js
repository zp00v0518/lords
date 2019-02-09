const { getRandomNumber } = require("template_func");
const tube = require("../tube.js");
const { GlobalMap, config, updateDB } = tube;
const update = new updateDB();

//добавляю нового Игрока на глобальную карту
function addNewUserToGlobalMap(user, serverName, callback = function() {}) {
  const { createTown } = tube;
  // console.log("********** addNewUserToGlobalMap Work ************");
  return new Promise((resolve, reject) => {
    checkUserPosition(serverName, (x, y) => {
      const newTown = createTown({ status: "new", name: "New Castle" });
      const optionsForUpdateBD = {
        collectionName: serverName,
        filtr: {
          x,
          y,
          class: config.schema.document.class.map,
        },
        updateDoc: {
          $set: {
            region: newTown.regionMap,
            userId: user._id,
            type: 1,
            nickName: user.nickName,
            town: newTown
          }
        }
      };
      delete newTown.regionMap;
      update.one(optionsForUpdateBD).then(result => {
        GlobalMap[serverName][x][y].region = newTown.regionMap;
        GlobalMap[serverName][x][y].userId = user._id;
        GlobalMap[serverName][x][y].type = 1;
        GlobalMap[serverName][x][y].nickName = user.nickName;
        GlobalMap[serverName][x][y].town = newTown;
        resolve(GlobalMap[serverName][x][y]);
        return callback(null, GlobalMap[serverName][x][y]);
      });
    });
  });
}

//получения случайного региона и проверка на занятость другим игроком или памятником
function checkUserPosition(serverName, callback) {
  var x = getRandomNumber(gameVariables.numSectionGlobalMap - 1);
  var y = getRandomNumber(gameVariables.numSectionGlobalMap - 1);
  var region = GlobalMap[serverName][x][y];
  if (region.type !== 0) {
    return checkUserPosition(callback);
  } else {
    return callback(x, y);
  }
}
module.exports = addNewUserToGlobalMap;
