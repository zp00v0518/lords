// const connectMongoDB = require("./connectMongoDB.js");
const bulkDB = require('./bulkWrite.js');
// const insertInDB = new find();
const bulkWrite = new bulkDB();

const arr = [
  [{ x: 17, y: 18 }, { x: 17, y: 19 }, { x: 17, y: 0 }],
  [{ x: 18, y: 18 }, { x: 18, y: 19 }, { x: 18, y: 0 }],
  [{ x: 19, y: 18 }, { x: 19, y: 19 }, { x: 19, y: 0 }]
];

async function testing() {
  const serverName = 'server_1';
  const newValue = 13;
  const query = [
    {
      updateOne: {
        filter: { x: 19, y: 17, 'control.size': { $lt: newValue } },
        update: 111
        // update: {
        //   $set: {
        //     'control.size': newValue,
        //     'control.color': 'red',
        //   }
        // }
      }
    }
  ];
  // const options = {
  //   upsert: false
  // };
  const findResult = await bulkWrite.set(serverName, query);
  console.log(findResult);
  bulkWrite.close();
}

setTimeout(testing, 3000);
