import mongodb from 'mongodb';
const { ObjectId } = mongodb
import updateDB from '../../workWithMongoDB/updateDB.js';
const update = new updateDB();
import getLastValueControl from './getLastValueControl.js';

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

export default setValueInSectorById;
