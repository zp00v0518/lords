const template = require('template_func');
const console = new template.Log(__filename);
const ObjectId = require('mongodb').ObjectID;
const { findInDB } = require('../../workWithMongoDB');
const find = new findInDB();

async function getLastValueControl(serverName, sectorId) {
  const findOptions = {
    collectionName: serverName,
    query: {
      _id: ObjectId(sectorId)
    },
    needFields: {
      'control.lastValue': 1,
      _id: 0
    }
  };
  const value = await find.one(findOptions);
  return value && value.control && value.control.lastValue ? value.control.lastValue : 0;
}

module.exports = getLastValueControl;
