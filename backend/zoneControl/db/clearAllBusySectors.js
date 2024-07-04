import updateDB from '../../workWithMongoDB/updateDB.js';
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
async function clearInGlobalMap(serverName) {
  const GlobalMap = await import('../../globalMap/constractGlobalMap.js');
  const arr = GlobalMap.default[serverName];
  arr.forEach(row => {
    row.forEach(sector => {
      if (sector.control) {
        sector.control = {};
      }
    });
  });
}

export default clearAllBusySectors;
