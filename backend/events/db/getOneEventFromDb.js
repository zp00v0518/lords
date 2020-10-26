const ObjectId = require('mongodb').ObjectID;
const { findInDB } = require('../../workWithMongoDB');
const find = new findInDB();

async function getOneEventFromDb(serverName, eventId) {
  const findOptions = {
    collectionName: serverName,
    query: {
      _id: ObjectId(eventId)
    }
  };
  const result = await find.one(findOptions);
  return result;
}

module.exports = getOneEventFromDb;
