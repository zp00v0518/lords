import updateDB from '../../workWithMongoDB/updateDB.js';
const updated = new updateDB();

async function addHeroToTown(serverName, townId, heroId, callback = function () { }) {
  const filtr = {
    _id: townId
  };
  const updateDoc = {
    $push: {
      heroes: heroId
    }
  };
  const result = await updated.one({ collectionName: serverName, filtr, updateDoc });
  return result;
}

module.exports = addHeroToTown;

export default addHeroToTown
