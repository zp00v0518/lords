const { findInDB } = require("../../workWithMongoDB");
const find = new findInDB();

function getAllTownsFromDB({ serverName }, callback = () => {}) {
  return new Promise((resolve, reject) => {
    const findOptions = {
      collectionName: serverName,
      query: {
        town: { $exists: true }
      }
    };
    find
      .all(findOptions)
      .then(result => {
        callback(null, result.result);
        return resolve(result.result);
      })
      .catch(err => {
        callback(err);
        return reject(err);
      });
  });
}

module.exports = getAllTownsFromDB;
