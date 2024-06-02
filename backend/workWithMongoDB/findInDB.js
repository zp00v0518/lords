const connectMongoDB = require('./connectMongoDB.js');
const config = require('../config/config.js');
const mongo = new connectMongoDB();
mongo.connect({ dbName: config.db.name });

function findInDB() {
  this.one = function(options, callback) {
    return new Promise((resolve, reject) => {
      let collection = mongo.open(options.collectionName);
      let needFields = options.needFields || null;
      let query = options.query || null;
      let skip = options.skip || null;
      let comment = options.comment || null;
      collection.findOne(query, { projection: needFields, skip: skip }, (err, findResult) => {
        if (err) {
          reject(err);
          throw err;
        }
        resolve(findResult);
        return callback ? callback(findResult) : findResult;
      });
    });
  };
  this.all = function(options, callback) {
    return new Promise((resolve, reject) => {
      let collection = mongo.open(options.collectionName);
      let sort = options.sort || 0;
      let limit = options.limit || 0;
      let skip = options.skip || 0;
      let needFields = options.needFields || null;
      let query = options.query || null;
      let comment = options.comment || null;
      collection
        .find(query, {
          projection: needFields,
          sort: sort,
          skip: skip,
          limit: limit,
          comment: comment
        })
        .toArray((err, itog) => {
          if (err) {
            reject(err);
            throw err;
          }
          let findResult = {
            result: itog,
            sort: sort,
            limit: limit,
            skip: skip
          };
          resolve(findResult);
          return callback ? callback(findResult) : findResult;
        });
    });
  };
  this.count = function(options, callback = function() {}) {
    return new Promise((resolve, reject) => {
      let collection = mongo.open(options.collectionName);
      let query = options.query || null;
      collection.countDocuments(query, (err, count) => {
        if (err) {
          reject(err);
          throw err;
        }
        resolve(count);
        return callback(count);
      });
    });
  };

  this.close = function() {
    mongo.close();
  };
}

module.exports = findInDB;
