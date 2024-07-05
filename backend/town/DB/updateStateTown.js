import mongodb from 'mongodb';
const { ObjectId } = mongodb
import updateDB from '../../workWithMongoDB/updateDB.js';
const update = new updateDB();

// обновляет состояние города в БД (не Региона или его-то другого. ТОлько города)
async function updateStateTown(sector, ops = { upsert: false }, callback) {
  const optionsForUpdate = {
    collectionName: sector.serverName,
    filtr: { _id: new ObjectId(sector._id) },
    updateDoc: { $set: { town: sector.town } },
    ops: ops
  };
  const result = await update.one(optionsForUpdate)
  return callback ? callback(result) : result;
  // return new Promise((resolve, reject) => {
  //   const optionsForUpdate = {
  //     collectionName: sector.serverName,
  //     filtr: { _id: new ObjectId(sector._id) },
  //     updateDoc: { $set: { town: sector.town } },
  //     ops: ops
  //   };
  //   update
  //     .one(optionsForUpdate)
  //     .then(result => {
  //       callback(result.result);
  //       return resolve(result.result);
  //     })
  //     .catch(err => {
  //       callback(err);
  //       return reject(err);
  //     });
  // });
}

export default updateStateTown;
