const mongoClient = require('mongodb').MongoClient;
const config = require('../config/config.js');

function Mongo() {
  this.open = function(collectionName) {
    this.collection = this.db.collection(collectionName); // often err  - часто возникает при hot-reload сервера, в тот момент, когда идет запрос с фронта
    return this.collection;
  };
  this.close = function() {
    console.log(this.client);
    this.client.close();
    console.log('Подключение к Монго закрыто');
  };
  this.connect = function(options = {}, callback = function() {}) {
    return new Promise((resolve, reject) => {
      let dbName = options.dbName || 'test';
      this.url = options.url || 'mongodb://localhost:27017';
      mongoClient.connect(
        this.url,
        { useNewUrlParser: true },
        (err, client) => {
          if (err) {
            config.db.check = false;
            reject(err);
            throw err;
          }
          console.log('Подключение к Монго прошло успешно');
          this.db = client.db(dbName);
          this.client = client;
          config.db.check = true;
          resolve();
          return callback();
        }
      );
    });
  };
  this.getCollections = function(callback = function() {}) {
    return new Promise((resolve, reject) => {
      this.db
        .collections()
        .then(result => {
          const arr = [];
          const serverList = config.db.collections.servers;
          result.forEach(item => {
            if (serverList.includes(item.s.name)) {
              arr.push(item.s.name);
            }
          });
          callback(arr);
          return resolve(arr);
        })
        .catch(err => {
          callback(err);
          return reject(err);
        });
    });
  };
}

module.exports = Mongo;
