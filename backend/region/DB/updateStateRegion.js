const ObjectId = require("mongodb").ObjectID;
const { updateDB } = require("../../workWithMongoDB");
const update = new updateDB();

// обновляет состояние города в БД (не Региона или его-то другого. ТОлько города)
function updateStateRegion(
  sector,
  ops = { upsert: false },
  callback = function() {}
) {
  return new Promise((resolve, reject) => {
    // console.log(count++);
    const optionsForUpdate = {
      collectionName: sector.serverName,
      filtr: { _id: ObjectId(sector._id) },
      // updateDoc: sector,
      updateDoc: { $set: { region: sector.region } },
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

module.exports = updateStateRegion;
