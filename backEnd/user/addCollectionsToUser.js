const { updateDB, config } = srcRequire("tube");
const update = new updateDB();

//добавляет коллекцию в массив коллекций
function addCollectionsToUser(userId, serverName, callback = function() {}) {
  return new Promise((resolve, reject) => {
    const optionsForUpdateBD = {
      collectionName: config.db.collections.users,
      filtr: {
        _id: userId
      },
      updateDoc: {
        $push: { collections: serverName }
      }
    };
    update
      .one(optionsForUpdateBD)
      .then(result => {
        resolve(result);
        return callback;
      })
      .catch(err => {
        reject(err);
        return callback;
      });
  });
}

module.exports = addCollectionsToUser;
