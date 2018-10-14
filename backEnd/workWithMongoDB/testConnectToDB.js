const connectMongoDB = require("./connectMongoDB.js");
const findInDB = require("./findInDB.js");
// const insertInDB = new find();
const find = new findInDB();





function testing() {
  const options = {
    collectionName: 'test'
  };
  find.all(options)
    .then((findResult) => {
    console.log(findResult)
  })
    .catch((err) => {
      console.log(err)
    })
}

setTimeout(testing, 3000)
