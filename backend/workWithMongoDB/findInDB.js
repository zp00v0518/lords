import connectMongoDB from './connectMongoDB.js';
import config from '../config/config.js';
const mongo = new connectMongoDB();
mongo.connect({ dbName: config.db.name });

function findInDB() {
  this.one = async function (options) {
    let collection = await mongo.open(options.collectionName);
    let needFields = options.needFields || null;
    let query = options.query || null;
    let skip = options.skip || null;
    let comment = options.comment || null;
    const findResult = await collection.findOne(query, { projection: needFields, skip: skip });
    return findResult;
  };
  this.all = async function (options, callback) {
    let collection = await mongo.open(options.collectionName);
    let sort = options.sort || undefined;
    let limit = options.limit || 0;
    let skip = options.skip || 0;
    let needFields = options.needFields || null;
    let query = options.query || null;
    let comment = options.comment || null;
    let itog = await collection.find(query, {
      projection: needFields,
      sort: sort,
      skip: skip,
      limit: limit,
      comment: comment
    })

    itog = await itog.toArray()
    let findResult = {
      result: itog,
      sort: sort,
      limit: limit,
      skip: skip
    };
    return callback ? callback(findResult) : findResult;
    // return new Promise((resolve, reject) => {
    //   let collection = mongo.open(options.collectionName);
    //   let sort = options.sort || undefined;
    //   let limit = options.limit || 0;
    //   let skip = options.skip || 0;
    //   let needFields = options.needFields || null;
    //   let query = options.query || null;
    //   let comment = options.comment || null;
    //   collection
    //     .find(query, {
    //       projection: needFields,
    //       sort: sort,
    //       skip: skip,
    //       limit: limit,
    //       comment: comment
    //     })
    //     .toArray((err, itog) => {
    //       if (err) {
    //         reject(err);
    //         throw err;
    //       }
    //       let findResult = {
    //         result: itog,
    //         sort: sort,
    //         limit: limit,
    //         skip: skip
    //       };
    //       resolve(findResult);
    //       return callback ? callback(findResult) : findResult;
    //     });
    // });
  };
  this.count = async function (options) {
    let collection = await mongo.open(options.collectionName);
    let query = options.query || {};
    const count = await collection.countDocuments(query);
    return count;
  };

  this.close = function () {
    mongo.close();
  };
}

export default findInDB;
