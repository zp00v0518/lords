import config from '../../config/index.js';
import updateDB from '../../workWithMongoDB/updateDB.js';
const update = new updateDB();

function updateUser(userId, doc, callback = function () { }) {
  return new Promise((resolve, reject) => {
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
    update.one(optionsForUpdateBD).then(() => {
      resolve();
    });
  });
}

export default updateUser;
