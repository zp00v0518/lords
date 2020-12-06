const ObjectId = require('mongodb').ObjectID;
const config = require('../../config');
const { findInDB } = require('../../workWithMongoDB');
const find = new findInDB();

async function getUsersById(arr = []) {
  let curArr = arr;
  if (!(curArr[0] instanceof ObjectId)) {
    curArr = curArr.map(key => new ObjectId(key));
  }
  const findOptions = {
    collectionName: config.db.collections.users,
    query: {
      _id: { $in: curArr }
    }
  };
  const users = await find.all(findOptions);
  return users.result;
}

module.exports = getUsersById;
