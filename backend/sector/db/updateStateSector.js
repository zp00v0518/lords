const ObjectId = require('mongodb').ObjectID;
const { updateDB } = require('../../workWithMongoDB');
const update = new updateDB();

// обновляет состояние города в БД (не Региона или его-то другого. ТОлько города)
function updateStateSector(sector, docs, ops = { upsert: false }, callback = function() {}) {
  return new Promise((resolve, reject) => {
    if (!docs) {
      console.log(`В ${__dirname} не переданы документы для обновления`);
      return resolve(false);
    }
    const optionsForUpdate = {
      collectionName: sector.serverName,
      filtr: { _id: ObjectId(sector._id) },
      updateDoc: { $set: { ...docs } },
      ops: ops
    };
    update
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

module.exports = updateStateSector;
