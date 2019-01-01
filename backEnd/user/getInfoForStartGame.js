const tube = require("../tube.js");

function getInfoForStartGame(user, server, callback = function() {}) {
  const { findUserInGlobalMap, addNewUserToGlobalMap } = tube;
  return new Promise((resolve, reject) => {
    findUserInGlobalMap(user._id, server)
      .then(findResult => {
        const infoForStartGame = [];
        if (findResult.result.length === 0) {
          addNewUserToGlobalMap(user, server)
            .then(sectorGlobalMap => {
              infoForStartGame.push(sectorGlobalMap)
              resolve(infoForStartGame);
              return callback(null, infoForStartGame);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          resolve(findResult.result);
          return callback(null, findResult.result)
        }
      })
      .catch(err => {
        reject(err);
        return callback(err);
      });
  });
}

module.exports = getInfoForStartGame;
