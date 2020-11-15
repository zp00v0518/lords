const template = require('template_func');
const console = new template.Log(__filename);
const ConnectMongoDB = require('./connectMongoDB.js');
const config = require('../config/config.js');
const mongo = new ConnectMongoDB();
mongo.connect({ dbName: config.db.name });

function bulkWrite() {
  this.set = async function(collectionName, query = [], options = {}) {
    let collection = mongo.open(collectionName);
    const result = await collection.bulkWrite(query, {});
    return result;
  };

  this.close = function() {
    mongo.close();
  };
}

module.exports = bulkWrite;
