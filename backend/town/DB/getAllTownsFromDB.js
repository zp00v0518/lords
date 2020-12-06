const { findInDB } = require('../../workWithMongoDB');
const find = new findInDB();

async function getAllTownsFromDB(serverName) {
  const findOptions = {
    collectionName: serverName,
    query: {
      town: { $exists: true }
    }
  };
  const result = await find.all(findOptions);
  return result.result;
}

module.exports = getAllTownsFromDB;
