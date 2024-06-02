const ObjectId = require('mongodb').ObjectID;
const needFields = require('./needFields');
const { findInDB } = require('../../workWithMongoDB');
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

module.exports = getOneSectorForGlobalMap;
