const template = require('template_func');
const console = new template.Log(__filename);
const { findInDB, schema } = require('../../workWithMongoDB');
const find = new findInDB();

async function findSectorsByCoords(collectionName, arr, options = {}) {
  const query = getQuery(arr);
  const optiinsForFind = {
    collectionName,
    query,
    needFields: options.needFields
  };
  const result = await find.all(optiinsForFind);
  return result;
}

function getQuery(arr) {
  const $or = [];
  for (let i = 0; i < arr.length; i++) {
    const row = arr[i];
    for (let h = 0; h < row.length; h++) {
      const item = row[h];
      const obj = {
        x: item.x,
        y: item.y,
        class: schema.document.class.map
      };
      $or.push(obj);
    }
  }
  return { $or };
}

module.exports = findSectorsByCoords;
