// const ObjectId = require('mongodb').ObjectID;
const config = require('../../config');
const { findInDB } = require('../../workWithMongoDB');
const find = new findInDB();

async function getUsersById(arr) {
  const findOptions = {
    collectionName: config.db.collections.users,
    query: {
      _id: { $in: arr }
    }
  };
  const users = await find.all(findOptions);
  return users;
}

module.exports = getUsersById;
