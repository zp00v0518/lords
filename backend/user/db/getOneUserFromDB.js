import mongodb from 'mongodb';
const { ObjectId } = mongodb;
import config from '../../config/index.js';
import findInDB from '../../workWithMongoDB/findInDB.js';
const find = new findInDB();

async function getOneUserFromDB(userId) {
  const findOptions = {
    collectionName: config.db.collections.users,
    query: {
      _id: new ObjectId(userId)
    }
  };
  const result = await find.one(findOptions);
  return result;
}

export default getOneUserFromDB;
