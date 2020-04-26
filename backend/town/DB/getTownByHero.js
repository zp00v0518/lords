const ObjectId = require('mongodb').ObjectID;
const { findInDB } = require('../../workWithMongoDB');
const document = require('../../workWithMongoDB/schema').document;
const find = new findInDB();

async function getTownByHero(serverName, heroId) {
  const findOptions = {
    collectionName: serverName,
    query: {
      class: document.class.map,
      town: { $exists: true },
      heroes: ObjectId(heroId)
    }
  };
  const sector = await find.one(findOptions);
  return sector;
}

module.exports = getTownByHero;
