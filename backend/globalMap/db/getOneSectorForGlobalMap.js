import mongodb from 'mongodb';
const { ObjectId } = mongodb
const needFields = require('./needFields');
import findInDB from '../../workWithMongoDB/findInDB.js';
const find = new findInDB();

async function getOneSectorForGlobalMap(serverName, sectorId) {
  const findOptions = {
    collectionName: serverName,
    query: {
      _id: ObjectId(sectorId)
    },
    needFields
  };
  const result = await find.one(findOptions);
  return result;
}

export default getOneSectorForGlobalMap;
