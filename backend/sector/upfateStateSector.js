const { updateDB } = require('../tube.js');
const update = new updateDB();

//обновляет состояние региона в БД (не замка или его-то другого. ТОлько региона)
function upfateStateSector(
  sector,
  serverName,
  ops = { upsert: false },
  callback = function() {}
) {
  return new Promise((reslove, reject) => {
    const optionsForUpdate = {
      collectionName: serverName,
      filtr: { _id: sector._id },
      updateDoc: { $set: { region: sector.region, town: sector.town} },
      ops
    };
    update.one(optionsForUpdate, result => {
      callback(result.result);
      return reslove(result.result);
    });
  });
}

module.exports = upfateStateSector;
