const ObjectId = require('mongodb').ObjectID;
const { updateDB } = require('../../workWithMongoDB');
const update = new updateDB();
const getLastValueControl = require('./getLastValueControl');

async function setValueInSectorById(serverName, sectorId, value) {
  const lastValue = await getLastValueControl(serverName, sectorId);
  const resultValue = lastValue + value;
  const key = Date.now();
  const optionsForUpdateBD = {
    collectionName: serverName,
    filtr: {
      _id: new ObjectId(sectorId)
    },
    updateDoc: {
      $set: {
        [`control.values.${key}`]: resultValue,
        [`control.lastValue`]: resultValue
      }
    }
  };
  const result = await update.one(optionsForUpdateBD);
  return result;
}

module.exports = setValueInSectorById;
