const ObjectId = require('mongodb').ObjectID;
const config = require('../../config');
const { findInDB } = require('../../workWithMongoDB');
const find = new findInDB();

async function getOneUserFromDB(userId) {
  const findOptions = {
    collectionName: config.db.collections.users,
    query: {
      _id: ObjectId(userId)
    }
  };
  const result = await find.one(findOptions);
  return result;
}

module.exports = getOneUserFromDB;
