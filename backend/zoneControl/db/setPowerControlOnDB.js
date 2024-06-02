const template = require('template_func');
const console = new template.Log(__filename);
const changePowerControlInGlobalMap = require('./changePowerControlInGlobalMap');
const { needFields } = require('../../globalMap/db');
const { findSectorsByCoords } = require('../../sector/db');
const { bulkWrite } = require('../../workWithMongoDB');
const bulk = new bulkWrite();

const powerKey = 'control.power';
const colorKey = 'control.color';
const idKey = 'control.userId';

async function setPowerControlOnDB(collectionName, arr, user) {
  const query = createQueryToDB(collectionName, arr, user);
  let updateResult = null;
  try {
    updateResult = await bulk.set(collectionName, query);
    const sectors = await findSectorsByCoords(collectionName, arr, { needFields });
    changePowerControlInGlobalMap(collectionName, sectors.result);
  } catch (err) {
    console.log(err);
  }
  return updateResult;
}

function createQueryToDB(collectionName, arr, user) {
  const query = [];
  const color = user.collections[collectionName].color || '#000000';
  const userId = user._id;
  for (let i = 0; i < arr.length; i++) {
    const row = arr[i];
    for (let h = 0; h < row.length; h++) {
      const template = getTemplateBulkCell();
      const item = row[h];
      const { filter, update } = template.updateOne;
      filter.x = item.x;
      filter.y = item.y;
      filter[powerKey].$lt = item.power;
      update.$set[powerKey] = item.power;
      update.$set[colorKey] = color;
      update.$set[idKey] = userId;
      query.push(template);
    }
  }
  return query;
}

function getTemplateBulkCell() {
  const filter = { x: 0, y: 0, [powerKey]: { $lt: 0 } };
  const update = {
    $set: {
      [powerKey]: 0,
      [colorKey]: '',
      [idKey]: ''
    }
  };
  const template = {
    updateOne: {
      filter,
      update
    }
  };
  return template;
}

module.exports = setPowerControlOnDB;
