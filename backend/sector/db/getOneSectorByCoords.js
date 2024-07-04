import schema from '../../workWithMongoDB/schema.js';
import findInDB from '../../workWithMongoDB/findInDB.js';
const find = new findInDB();

// TODO: метод не протестирован
async function getOneSectorByCoords(collectionName, x, y, options = {}) {
  const optiinsForFind = {
    collectionName,
    query: {
      class: schema.document.class.map,
      x,
      y
    },
    needFields: options.needFields
  };
  const result = await find.one(optiinsForFind);
  return result;
}

export default getOneSectorByCoords;
