const { updateDB } = require("../tube.js");
const update = new updateDB();

//обновляет состояние города в БД (не Региона или его-то другого. ТОлько города)
function updateStateTown(
  sector,
  serverName,
  ops = { upsert: false },
  callback = function() {}
) {
  return new Promise((reslove, reject) => {
    const optionsForUpdate = {
      collectionName: serverName,
      filtr: { _id: sector._id },
      updateDoc: { $set: { town: sector.town } },
      ops: ops
    };
    // update.one(optionsForUpdate, result => {
    //   callback(result.result);
    //   return reslove(result.result);
    // });
    update.one(optionsForUpdate).then(result => {
      callback(result.result);
      return reslove(result.result);
    }).catch(err => {
      callback(err);
      return reject(err);
    });
  });
}

module.exports = updateStateTown;
