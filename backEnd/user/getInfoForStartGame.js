const tube = require("../tube.js");

function getInfoForStartGame(user, server, callback = function() {}) {
  const { findUserInGlobalMap, addNewUserToGlobalMap } = tube;
  return new Promise((resolve, reject) => {
    findUserInGlobalMap(user._id)
      .then(findResult => {
        if (findResult.result.length === 0) {
          addNewUserToGlobalMap(user, server)
            .then(coords => {
              resolve(coords);
              return callback(null, coords);
            })
            .catch(err => {
              console.log(err);
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
