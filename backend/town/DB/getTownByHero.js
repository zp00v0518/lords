import mongodb from 'mongodb';
const { ObjectId } = mongodb
import findInDB from '../../workWithMongoDB/findInDB.js';
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
