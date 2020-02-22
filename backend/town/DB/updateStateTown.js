const { updateDB } = require("../../workWithMongoDB");
const update = new updateDB();

// обновляет состояние города в БД (не Региона или его-то другого. ТОлько города)
function updateStateTown(
  sector,
  ops = { upsert: false },
  callback = function() {}
) {
  return new Promise((reslove, reject) => {
    const optionsForUpdate = {
      collectionName: sector.serverName,
      filtr: { _id: sector._id },
      updateDoc: { $set: { town: sector.town } },
      ops: ops
    };
    update
      .one(optionsForUpdate)
      .then(result => {
        callback(result.result);
        return reslove(result.result);
      })
      .catch(err => {
        callback(err);
        return reject(err);
      });
  });
}

module.exports = updateStateTown;
