const { document } = require('../../workWithMongoDB/schema');
const { findInDB } = require('../../workWithMongoDB');
const find = new findInDB();

function getHeroesFromDB(server, { userId }, callback = () => {}) {
  return new Promise((resolve, reject) => {
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
  });
}

module.exports = getHeroesFromDB;
