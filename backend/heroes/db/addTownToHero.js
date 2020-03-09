const { updateDB } = require('../../workWithMongoDB');
const updated = new updateDB();

function addTownToHero(serverName, townId, heroId, callback = function() {}) {
  return new Promise((resolve, reject) => {
    const filtr = {
      _id: heroId
    };
    const updateDoc = {
      $set: {
        townId
      }
    };
    updated
      .one({ collectionName: serverName, filtr, updateDoc })
      .then(result => {
        resolve(result);
        return callback(null, result);
      })
      .catch(err => {
        reject(result);
        return callback(err);
      });
  });
}

module.exports = addTownToHero;
