const ObjectId = require("mongodb").ObjectID;
const { document } = require("../../workWithMongoDB/schema");
const { findInDB } = require("../../workWithMongoDB");
const find = new findInDB();

function getHeroesFromDB(server, { userId, heroId }, callback = () => {}) {
  return new Promise((resolve, reject) => {
    if (userId) {
      const query = {
        class: document.class.hero,
        userId
      };
      const ops = {
        collectionName: server,
        query
      };
      find
        .all(ops)
        .then(findResult => {
          resolve(findResult);
          return callback(null, findResult);
        })
        .catch(err => {
          reject(err);
          return callback(err);
        });
    } else if (heroId) {
      const query = {
        class: document.class.hero,
        _id: ObjectId(heroId)
      };
      const ops = {
        collectionName: server,
        query
      };
      find
        .one(ops)
        .then(findResult => {
          resolve(findResult);
          return callback(null, findResult);
        })
        .catch(err => {
          reject(err);
          return callback(err);
        });
    }
  });
}

module.exports = getHeroesFromDB;
