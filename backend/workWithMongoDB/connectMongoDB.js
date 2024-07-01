import mongodb from 'mongodb';
const mongoClient = mongodb.MongoClient;
import config from '../config/config.js';

function Mongo() {
  this.open = function (collectionName) {
    this.collection = this.db.collection(collectionName); // often err  - часто возникает при hot-reload сервера, в тот момент, когда идет запрос с фронта
    return this.collection;
  };
  this.close = function () {
    this.client.close();
    console.log('Подключение к Монго закрыто');
  };
  this.connect = async function (options = {}) {
    let dbName = options.dbName || 'test';
    this.url = options.url || 'mongodb://localhost:27017';
    this.client = new mongoClient(this.url);
    try {
      await this.client.connect();
      console.log('Подключение к Монго прошло успешно');
      this.db = this.client.db(dbName);
      config.db.check = true;
    } catch (err) {
      console.error(err)
      config.db.check = false;
      return false
    }
    return true
  };
  this.getCollections = function (callback = function () { }) {
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

export default Mongo;
