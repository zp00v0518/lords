//составляю массив карты из данных хранящихся в БД
//чтобы не обращаться постоянно в БД

const { findInDB, config } = require("../tube.js");
const schema = require('../workWithMongoDB/schema')
const find = new findInDB();
const GlobalMap = {};
const serverList = config.db.collections.servers;

function constractGlobalMap() {
  serverList.forEach(server => {
    const serverName = server.collectionName;
    GlobalMap[serverName] = [];
    for (let i=0; i<gameVariables.numSectionGlobalMap; i++){
      let row = [];
      GlobalMap[serverName].push(row)
      for (let h=0; h<gameVariables.numSectionGlobalMap; h++){
        let region = 0;
        GlobalMap[serverName][i][h] = region;
      }
    };
    const findOptions = {
      collectionName: serverName,
      // collectionName: config.db.collections.map,
      query: {class: schema.document.class.map},
    };
    find.all(findOptions).then(result => {
      const regionsArr = result.result;
      regionsArr.forEach(item => {
        const x = item.x;
        const y = item.y;
        GlobalMap[serverName][x][y] = item;
      });
      console.log(`Построение глобальной карты для ${serverName} завершено`)
    });
  });
  config.server.ready_to_work = true;
}

function returnGlobalMap() {
  return GlobalMap;
}

function startConstractMap() {
  const flag = config.db.check;
  if (flag) {
    constractGlobalMap();
  } else {
    setTimeout(startConstractMap, 300);
  }
}
startConstractMap();

module.exports = returnGlobalMap();
