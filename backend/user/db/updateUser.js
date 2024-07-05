import config from '../../config/index.js';
import updateDB from '../../workWithMongoDB/updateDB.js';
const update = new updateDB();

async function updateUser(userId, doc) {
  const cookie = doc.userCookies;
  const optionsForUpdateBD = {
    collectionName: config.db.collections.users,
    filtr: {
      _id: userId
    },
    updateDoc: {
      $set: {
        ...doc
      }
    }
  };
  return await update.one(optionsForUpdateBD)
}

export default updateUser;
