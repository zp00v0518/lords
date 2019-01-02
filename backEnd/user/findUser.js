const { findInDB, config } = require("../tube.js");

const find = new findInDB();

function findUserInGlobalMap(userId, server=null, callback = function() {}) {
  return new Promise((resolve, reject) => {
    const options = {
      collectionName: config.db.collections.map,
      query: { userId: userId, server: server }
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

function findUserInDB(userCookies, callback = function() {}) {
  return new Promise((resolve, reject) => {
    const options = {
      collectionName: config.db.collections.users,
      query: { cookie: userCookies }
    };
    find
      .one(options)
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

module.exports = { findUserInGlobalMap, findUserInDB };