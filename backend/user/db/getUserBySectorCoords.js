const { getOneSectorByCoords } = require('../../sector/db');

// TODO: метод не дописан
async function getUserBySectorCoords(collectionName, x, y) {
  const sector = await getOneSectorByCoords(collectionName, x, y);
  console.log(sector);
}

module.exports = getUserBySectorCoords;
