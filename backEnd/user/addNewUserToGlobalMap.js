const { getRandomNumber } = require("template_func");
const tube = require("../tube.js");
const { GlobalMap, config, updateDB } = tube;
const update = new updateDB();

//добавляю нового Игрока на глобальную карту
function addNewUserToGlobalMap(user, server, callback = function() {}) {
  const { createTown } = tube;
  // console.log("********** addNewUserToGlobalMap Work ************");
  return new Promise((resolve, reject) => {
    checkUserPosition(server, (x, y) => {
      const newTown = createTown({ status: "new", name: "New Castle" });
      const optionsForUpdateBD = {
        collectionName: config.db.collections.map,
        filtr: {
          x,
          y,
          server
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
      update.one(optionsForUpdateBD).then(result => {
        GlobalMap[server][x][y].region = newTown.regionMap;
        GlobalMap[server][x][y].userId = user._id;
        GlobalMap[server][x][y].type = 1;
        GlobalMap[server][x][y].nickName = user.nickName;
        GlobalMap[server][x][y].town = newTown;
        resolve(GlobalMap[server][x][y]);
        return callback(null, GlobalMap[server][x][y]);
      });
    });
  });
}

//получения случайного региона и проверка на занятость другим игроком или памятником
function checkUserPosition(server, callback) {
  var x = getRandomNumber(gameVariables.numSectionGlobalMap - 1);
  var y = getRandomNumber(gameVariables.numSectionGlobalMap - 1);
  var region = GlobalMap[server][x][y];
  if (region.type !== 0) {
    return checkUserPosition(callback);
  } else {
    return callback(x, y);
  }
}
module.exports = addNewUserToGlobalMap;
