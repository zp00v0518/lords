const { updateDB } = require('../../workWithMongoDB');
const update = new updateDB();

async function clearAllBusySectors(serverName) {
  const updateOptions = {
    collectionName: serverName,
    filtr: {
      'control.power': { $gt: 0 }
    },
    updateDoc: {
      $set: {
        [`control.userId`]: '',
        [`control.power`]: 0,
        [`control.color`]: ''
      }
    }
  };
  const result = await update.updateMany(updateOptions);
  return result.result;
}

module.exports = clearAllBusySectors;
