import findInDB from '../../workWithMongoDB/findInDB.js';
import { schema } from "../../workWithMongoDB/index.js";
const { document } = schema
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

export default getTownByCoords;
