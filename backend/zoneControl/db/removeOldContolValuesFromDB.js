const template = require('template_func');
const console = new template.Log(__filename);
const ZoneControl = require('../ZoneControl');
const ObjectId = require('mongodb').ObjectID;
const { updateDB } = require('../../workWithMongoDB');
const update = new updateDB();

async function removeOldContolValuesFromDB(serverName, sectorId, values) {
  const computedTime = ZoneControl.computedTime;
  const now = Date.now();
  const lastTime = now - computedTime;

  const listKey = Object.keys(values).filter(keyTime => +keyTime < lastTime);
  const removeList = {};
  if (listKey.length === 0) return;
  listKey.forEach(key => {
    removeList[`control.values.${key}`] = 1;
  });
  const optionsForUpdate = {
    collectionName: serverName,
    filtr: { _id: ObjectId(sectorId) },
    updateDoc: { $unset: removeList }
  };
  const result = await update.one(optionsForUpdate);
  return result.result;
}

module.exports = removeOldContolValuesFromDB;
