import mongodb from 'mongodb';
const { ObjectId } = mongodb;

import findInDB from '../../workWithMongoDB/findInDB.js';
const find = new findInDB();

async function getOneEventFromDb(serverName, eventId) {
  const findOptions = {
    collectionName: serverName,
    query: {
      _id: new ObjectId(eventId)
    }
  };
  const result = await find.one(findOptions);
  return result;
}

export default getOneEventFromDb;
