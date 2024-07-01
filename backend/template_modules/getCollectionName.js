import config from "../config/index.js";
const serversList = config.db.collections.servers;

function getCollectionName(name) {
  let collection = "";
  for (let i = 0; i < serversList.length; i++) {
    if (serversList[i].name === name) {
      collection = serversList[i].collectionName;
      break;
    }
  }
  return collection;
}

export default getCollectionName;
