const findInDB = require('./findInDB.js');
const find = new findInDB();

function getDoc(){
  const findOptions = {
    collectionName: serverName,
    query: {globalMap: '$exist'},
  };
  find.all(findOptions).then(result => {
    GlobalMap[serverName] = result.result;
  });
}

