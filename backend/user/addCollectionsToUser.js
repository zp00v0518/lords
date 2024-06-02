// const { updateDB, config } = srcRequire('tube');
const { updateDB } = require('../workWithMongoDB');
const config = require('../config');
const update = new updateDB();

//добавляет коллекцию в массив коллекций
function addCollectionsToUser(user, serverName, callback = function() {}) {
  return new Promise((resolve, reject) => {
    const obj = createStatUserGame({ name: serverName });
    const key = `collections.${serverName}`;
    const optionsForUpdateBD = {
      collectionName: config.db.collections.users,
      filtr: {
        _id: user._id
      },
      updateDoc: {
        $set: { [key]: obj }
      }
    };
    update
      .one(optionsForUpdateBD)
      .then(result => {
        resolve(result);
        return callback;
      })
      .catch(err => {
        reject(err);
        return callback;
      });
  });
}

function createStatUserGame(ops) {
  return {
    name: ops.name || '',
    race: ops.race || '',
    alians: {},
    rate: {}
  };
}

module.exports = addCollectionsToUser;
