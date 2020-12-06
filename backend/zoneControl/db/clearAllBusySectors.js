const { updateDB } = require('../../workWithMongoDB');
const update = new updateDB();

async function clearAllBusySectors(serverName) {
  clearInGlobalMap(serverName);
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
function clearInGlobalMap(serverName) {
  const GlobalMap = require('../../globalMap/constractGlobalMap');
  const arr = GlobalMap[serverName];
  arr.forEach(row => {
    row.forEach(sector => {
      if (sector.control) {
        sector.control = {};
      }
    });
  });
}

module.exports = clearAllBusySectors;
