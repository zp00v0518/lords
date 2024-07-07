import mongodb from 'mongodb';
import updateDB from '../../workWithMongoDB/updateDB.js';

const { ObjectId } = mongodb;

const updated = new updateDB();

async function updateHeroInDB(serverName, heroId, newDoc, ops = {}, callback) {
  if (!serverName || !heroId || !newDoc) {
    console.log(`В функцию ${this.name} переданы не все параметры`);
    return;
  }

  const optionsForUpdate = {
    collectionName: serverName,
    filtr: { _id: new ObjectId(heroId) },
    updateDoc: { $set: newDoc },
    ops: ops,
  };
  const result = await updated.one(optionsForUpdate);
  return callback ? callback(result) : result;

  // return new Promise((resolve, reject) => {
  //   const optionsForUpdate = {
  //     collectionName: serverName,
  //     filtr: { _id: new ObjectId(heroId) },
  //     updateDoc: { $set: newDoc },
  //     ops: ops
  //   }
  //   updated
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

export default updateHeroInDB;
