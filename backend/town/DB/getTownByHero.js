import mongodb from 'mongodb';
const { ObjectId } = mongodb
import findInDB from '../../workWithMongoDB/findInDB.js';
import { schema } from "../workWithMongoDB/index.js";
const { document } = schema
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

export default getTownByHero;
