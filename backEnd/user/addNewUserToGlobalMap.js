const { getRandomNumber } = require("template_func");
const tube = require("../tube.js");
const {GlobalMap} = tube;

//добавляю нового Игрока на глобальную карту
function addNewUserToGlobalMap(user, server, callback) {
  const {createTown} = tube;
  console.log("********** addNewUserToGlobalMap Work ************");
  return new Promise((resolve, reject) => {
    checkUserPosition(server, (x, y) => {
      const ops = {
        town: createTown({status: 'new', townName: "Some name"}),
        x,
        y,
      };

      resolve(ops);
      return callback(null, ops)
      // addNewCastleToGlobalMap(ops, () => {
      //   return callback();
      // });
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
// setTimeout(addNewUserToMap,5000);

module.exports = addNewUserToGlobalMap;
