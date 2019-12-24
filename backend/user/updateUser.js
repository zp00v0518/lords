const { updateDB, config} = require("../tube.js");
const update = new updateDB();

function updateUser(userId, doc, callback = function() {}) {
  return new Promise((resolve, reject) => {
    const cookie = doc.userCookies
    const optionsForUpdateBD = {
      collectionName: config.db.collections.users,
      filtr: {
        _id: userId,
      },
      updateDoc: {
        $set: {
          ...doc
        }
      }
    }
  })
}

module.exports = updateUser;
