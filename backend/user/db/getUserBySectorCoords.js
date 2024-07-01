import { getOneSectorByCoords } from '../../sector/db/index.js';

// TODO: метод не дописан
async function getUserBySectorCoords(collectionName, x, y) {
  const sector = await getOneSectorByCoords(collectionName, x, y);
  console.log(sector);
}

export default getUserBySectorCoords;
