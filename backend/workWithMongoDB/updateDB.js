const connectMongoDB = require("./connectMongoDB.js");
const config = require("../config/config.js");
// const {config} = require('../tube.js');
const template = require("template_func");
const mongo = new connectMongoDB();
mongo.connect({ dbName: config.db.name });
const log = new template.Log(__filename);

function updateDB() {
  //options  - объект с полями:
  //collectionName = String;
  //filtr = Object;`
  //updateDoc = Object;
  //ops = Object;

  this.one = function(options, callback = function() {}) {
    return new Promise((resolve, reject) => {
      if (!options.collectionName || !options.filtr || !options.updateDoc) {
        log.log(
          "Обновить БД не представляется возможным, т.к. не переданы все необходимые параметры"
        );
      }
      let collection = mongo.open(options.collectionName);
      let ops = options.ops || null;
      collection.updateOne(
        options.filtr,
        options.updateDoc,
        ops,
        (err, result) => {
          if (err) {
            reject(err);
            throw err;
          }
          resolve(result);
          return callback(result);
        }
      );
    });
  };
  this.close = function() {
    mongo.close();
  };

  this.many = function() {};
}

module.exports = updateDB;
