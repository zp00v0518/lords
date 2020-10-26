const ObjectId = require('mongodb').ObjectID;
const UpdateDB = require('../../workWithMongoDB').updateDB;
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

module.exports = updateEndEventInDb;
