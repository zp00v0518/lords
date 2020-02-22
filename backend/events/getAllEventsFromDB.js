const { findInDB } = require("../workWithMongoDB");
const { document } = require("../workWithMongoDB/schema");
// eslint-disable-next-line
const find = new findInDB();

function getAllEventsFromDB({ serverName }, callback = () => {}) {
  return new Promise((resolve, reject) => {
    const findOptions = {
      collectionName: serverName,
      query: {
        // $or: [{ "target.user": user._id }, { "init.user": user._id }],
        class: document.class.event,
        status: true
      },
      sort: { end: 1 }
    };
    find
      .all(findOptions)
      .then(result => {
        // const now = new Date().getTime;
        // if (result.result.length === 0 || result.result[0].end > now) {
        callback(null, result.result);
        return resolve(result.result);
        // } else {
        // callback(null, result.result);
        // return resolve(result.result);
        // }
      })
      .catch(err => {
        callback(err);
        return reject(err);
      });
  });
}

module.exports = getAllEventsFromDB;
