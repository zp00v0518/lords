const { findInDB, config } = require("../tube.js");

const find = new findInDB();

function findUserInGlobalMap(userId, callback = function() {}) {
  return new Promise((resolve, reject) => {
    const options = {
      collectionName: config.db.collections.map,
      query: { userId: userId }
    };
    find
      .all(options)
      .then(findResult => {
        resolve(findResult);
        return callback(null, findResult);
      })
      .catch(err => {
        reject(err);
        return callback(err);
      });
  });
}

module.exports = findUserInGlobalMap;
