const ObjectId = require('mongodb').ObjectID;
const { updateDB } = require('../../workWithMongoDB');
const update = new updateDB();

async function setValueInSectorById(serverName, sectorId, value) {
  const key = Date.now();
  const optionsForUpdateBD = {
    collectionName: serverName,
    filtr: {
      _id: new ObjectId(sectorId)
    },
    updateDoc: {
      $set: {
        [`control.values.${key}`]: value
      }
    }
  };
  const result = await update.one(optionsForUpdateBD);
 return result;
}

module.exports = setValueInSectorById;
