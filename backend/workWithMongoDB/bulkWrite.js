import template from 'template_func';
const console = new template.Log(__filename);
import ConnectMongoDB from './connectMongoDB.js';
import config from '../config/config.js';
const mongo = new ConnectMongoDB();
mongo.connect({ dbName: config.db.name });

function bulkWrite() {
  this.set = async function (collectionName, query = [], options = {}) {
    let collection = mongo.open(collectionName);
    const result = await collection.bulkWrite(query, {});
    return result;
  };

  this.close = function () {
    mongo.close();
  };
}

export default bulkWrite;
