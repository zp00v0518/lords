const { insertDB } = require("../../workWithMongoDB");
const insert = new insertDB();

//  НЕ ИСПОЛЬЗОВАТЬ!!! Использование этого метода переехало в папку DB
function addEventToDB(data, serverName, callback = function() {}) {
  return new Promise((resolve, reject) => {
    const doc = {
      class: "event",
      target: data.target,
      init: data.init,
      start: data.start,
      end: data.end,
      data: data.data,
      type: data.type,
      status: true,
      serverName
    };
    insert
      .one({ collectionName: serverName, doc: doc })
      .then(result => {
        callback(null, result);
        return resolve(result);
      })
      .catch(err => {
        callback(err);
        return reject(err);
      });
  });
}

module.exports = addEventToDB;

// const schema = {
//   type: String,
//   target: {
//     user: "ObjectId",
//     sector: "ObjectId",
//     x: "coordX",
//     y: "coordY"
//   },
//   init: {
//     user: "ObjectId",
//     sector: "ObjectId",
//     x: "coordX",
//     y: "coordY"
//   },
//   start: Date,
//   end: Date,
//   data: Object,
//   status: Boolean
// };
