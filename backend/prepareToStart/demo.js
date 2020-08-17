const insert = require('../workWithMongoDB/insertDB.js');
const insertDB = new insert();
const config = require('../config');
const userCreate = require('../user/userCreate');
const u_1 = require('./user_1');

const user_1 = userCreate(u_1);

function insertDemoUserToDB(user) {
  const options = {
    collectionName: config.db.collections.users,
    doc: user
  };
  insertDB.one(options).then(result => {
    console.log('insert Demo User');
    insertDB.close();
  });
}

function startCreate() {
  if (!config.db.check) {
    setTimeout(() => {
      startCreate();
    }, 100);
  } else {
    insertDemoUserToDB(user_1);
  }
}

startCreate();
