const { updateDB } = require('../../workWithMongoDB');
const update = new updateDB();

function inActiveteEvent(event, callback = () => {}) {
  return new Promise((resolve, reject) => {
    const data = {
      status: false
    };
    const optionsForUpdate = {
      collectionName: event.serverName,
      filtr: { _id: event._id },
      updateDoc: { $set: data }
    };
    update
      .one(optionsForUpdate)
      .then(result => {
        callback(null, result);
        return resolve(result);
      })
      .catch(err => {
        callback(err);
        return reject(err);
      });
  });
}

module.exports = inActiveteEvent;
