const { findInDB } = require('../../workWithMongoDB');
const document = require('../../workWithMongoDB/schema').document;
const find = new findInDB();

async function getTownByCoords(serverName, x, y) {
  const findOptions = {
    collectionName: serverName,
    query: {
      class: document.class.map,
      x,
      y
    }
  };
  const sector = await find.one(findOptions);
  return sector;
}

module.exports = getTownByCoords;
