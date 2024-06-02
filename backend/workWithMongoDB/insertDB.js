const connectMongoDB = require('./connectMongoDB.js');
// const {config} = require('../tube.js');
const config = require('../config/config.js');
const mongo = new connectMongoDB();
mongo.connect({ dbName: config.db.name });

function insertDB() {
  // options  - объект с полями:
  // collectionName = String;
  // doc = Object;
  this.mongo = mongo;
  this.one = async function (options, callback = function () { }) {
    let collection = mongo.open(options.collectionName);
    const insertResult = await collection.insertOne(options.doc);
    if (insertResult.acknowledged) {
      return callback(insertResult);
    } else {
      console.log('Вставка документа пройшла невдало')
      return insertResult
    }
  };
  this.many = function (options, callback = function () { }) {
    return new Promise((resolve, reject) => {
      let collection = mongo.open(options.collectionName);
      let ops = options.options || null;
      collection.insertMany(options.doc, ops, (err, result) => {
        if (err) {
          reject(err);
          throw err;
        }
        resolve(result);
        return callback(result);
      });
    });
  };
  this.close = function () {
    mongo.close();
  };
}

module.exports = insertDB;
