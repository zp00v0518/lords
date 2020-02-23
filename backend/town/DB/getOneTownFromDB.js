const ObjectId = require("mongodb").ObjectID;
const { findInDB } = require("../../workWithMongoDB");
const find = new findInDB();

function getOneTownFromDB(sectorId, serverName, callback = () => {}) {
  return new Promise((resolve, reject) => {
    const findOptions = {
      collectionName: serverName,
      query: {
        _id: ObjectId(sectorId)
      }
    };
    find
      .one(findOptions)
      .then(result => {
        callback(null, result);
        return resolve(result);
      })
      .catch(err => {
        callback(err);
        return reject(err);
      });
  });
}

module.exports = getOneTownFromDB;
