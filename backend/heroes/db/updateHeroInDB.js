const ObjectId = require('mongodb').ObjectID;
const { updateDB } = require('../../workWithMongoDB');
const updated = new updateDB();

function updateHeroInDB(serverName, heroId, newDoc, ops = {}, callback = () => {}) {
  if (!serverName || !heroId || !newDoc) {
    const funcName = __filename;
    console.log(`В функцию ${funcName} переданы не все параметры`);
    return;
  }
  return new Promise((resolve, reject) => {
    const optionsForUpdate = {
      collectionName: serverName,
      filtr: { _id: ObjectId(heroId) },
      updateDoc: { $set: newDoc },
      ops: ops
    };
    updated
      .one(optionsForUpdate)
      .then(result => {
        callback(result.result);
        return resolve(result.result);
      })
      .catch(err => {
        callback(err);
        return reject(err);
      });
  });
}

module.exports = updateHeroInDB;
