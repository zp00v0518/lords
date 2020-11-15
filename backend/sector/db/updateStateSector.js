const template = require('template_func');
const console = new template.Log(__filename);
const ObjectId = require('mongodb').ObjectID;
const { updateDB } = require('../../workWithMongoDB');
const update = new updateDB();

// обновляет состояние города в БД (не Региона или его-то другого. ТОлько города)
async function updateStateSector(sector, docs, ops = { upsert: false }) {
  if (!docs) {
    console.log(`В ${__dirname} не переданы документы для обновления`);
    return false;
  }
  const optionsForUpdate = {
    collectionName: sector.serverName,
    filtr: { _id: ObjectId(sector._id) },
    updateDoc: { $set: { ...docs } },
    ops: ops
  };
  const resultUpdate = await update.one(optionsForUpdate);
  return resultUpdate.result;
}

module.exports = updateStateSector;
