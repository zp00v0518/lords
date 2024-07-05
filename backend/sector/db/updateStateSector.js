import mongodb from 'mongodb';

const { ObjectId } = mongodb;

import updateDB from '../../workWithMongoDB/updateDB.js';
const update = new updateDB();

import path from 'node:path';
const __dirname = path.parse(import.meta.url).dir

// обновляет состояние города в БД (не Региона или его-то другого. ТОлько города)
async function updateStateSector(sector, docs, ops = { upsert: false }) {
  if (!docs) {
    console.log(`В ${__dirname} не переданы документы для обновления`);
    return false;
  }
  const optionsForUpdate = {
    collectionName: sector.serverName,
    filtr: { _id: new ObjectId(sector._id) },
    updateDoc: { $set: { ...docs } },
    ops: ops
  };
  const resultUpdate = await update.one(optionsForUpdate);
  return resultUpdate.result;
}

export default updateStateSector;
