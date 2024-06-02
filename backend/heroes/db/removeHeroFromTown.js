const ObjectId = require('mongodb').ObjectID;
const { updateDB } = require('../../workWithMongoDB');
const updated = new updateDB();

async function removeHeroFromTown(serverName, sectorId, heroId) {
  const filtr = {
    _id: ObjectId(sectorId)
  };
  const updateDoc = {
    $pull: { heroes: ObjectId(heroId) }
  };
  const z = await updated.one({ collectionName: serverName, filtr, updateDoc });
  return z;
}

module.exports = removeHeroFromTown;
