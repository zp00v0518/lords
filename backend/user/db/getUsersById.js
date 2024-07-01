import mongodb from 'mongodb';

const { ObjectId } = mongodb;
import config from '../../config/index.js';
import { findInDB } from '../../workWithMongoDB/index.js';
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

export default getUsersById;
