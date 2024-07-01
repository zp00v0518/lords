import mongodb from 'mongodb';
const { ObjectId } = mongodb;
import { updateDB } from '../../workWithMongoDB/index.js';
const UpdateDB = updateDB
const update = new UpdateDB();

async function updateEndEventInDb(serverName, eventId, newTime) {
  const optionsForUpdate = {
    collectionName: serverName,
    filtr: { _id: ObjectId(eventId) },
    updateDoc: { $set: { end: newTime } }
  };
  const result = await update.one(optionsForUpdate);
  return result;
}

export default updateEndEventInDb;
