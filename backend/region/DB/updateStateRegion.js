import mongodb from 'mongodb'
import updateDB from '../../workWithMongoDB/updateDB.js'

const { ObjectId } = mongodb
const update = new updateDB()

// обновляет состояние города в БД (не Региона или его-то другого. ТОлько города)
async function updateStateRegion(sector, ops = { upsert: false }, callback) {
  // console.log(count++);
  const optionsForUpdate = {
    collectionName: sector.serverName,
    filtr: { _id: new ObjectId(sector._id) },
    // updateDoc: sector,
    updateDoc: { $set: { region: sector.region } },
    ops: ops
  }
  const result = await update.one(optionsForUpdate)
  return callback ? callback(result) : result
  // return new Promise((resolve, reject) => {
  //   // console.log(count++);
  //   const optionsForUpdate = {
  //     collectionName: sector.serverName,
  //     filtr: { _id: new ObjectId(sector._id) },
  //     // updateDoc: sector,
  //     updateDoc: { $set: { region: sector.region } },
  //     ops: ops
  //   }
  //   update
  //     .one(optionsForUpdate)
  //     .then((result) => {
  //       callback(result.result)
  //       return resolve(result.result)
  //     })
  //     .catch((err) => {
  //       callback(err)
  //       return reject(err)
  //     })
  // })
}

export default updateStateRegion
