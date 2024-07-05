import mongodb from 'mongodb'
import updateDB from '../../workWithMongoDB/updateDB.js'
const { ObjectId } = mongodb
const updated = new updateDB();

async function removeHeroFromTown(serverName, sectorId, heroId) {
  const filtr = {
    _id: new ObjectId(sectorId)
  };
  const updateDoc = {
    $pull: { heroes: new ObjectId(heroId) }
  };
  const z = await updated.one({ collectionName: serverName, filtr, updateDoc });
  return z;
}

export default removeHeroFromTown
