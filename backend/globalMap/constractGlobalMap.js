// составляю массив карты из данных хранящихся в БД
// чтобы не обращаться постоянно в БД

// const { findInDB } = require("../tube.js");
const config = require('../config');
const schema = require('../workWithMongoDB/schema');
const { findInDB } = require('../workWithMongoDB');
const { controlStateEventsList } = require('../events');
const find = new findInDB();
const GlobalMap = {};
const serverList = config.db.collections.servers;

function constractGlobalMap() {
  serverList.forEach((server) => {
    const serverName = server.collectionName;
    GlobalMap[serverName] = [];
    for (let i = 0; i < global.gameVariables.numSectionGlobalMap; i++) {
      let row = [];
      GlobalMap[serverName].push(row);
      for (let h = 0; h < global.gameVariables.numSectionGlobalMap; h++) {
        let region = 0;
        GlobalMap[serverName][i][h] = region;
      }
    }
    const findOptions = {
      collectionName: serverName,
      query: { class: schema.document.class.map },
      needFields: {
        class: 1,
        serverName: 1,
        id: 1,
        type: 1,
        x: 1,
        y: 1,
        region: 1,
        nickName: 1,
        userId: 1,
        'town.id': 1,
        'town.class': 1,
        'town.name': 1,
        'town.lvl': 1,
        'town.race': 1,
        'town.sectorId': 1
      }
    };
    find.all(findOptions).then((result) => {
      const regionsArr = result.result;
      regionsArr.forEach((item) => {
        const x = item.x;
        const y = item.y;
        GlobalMap[serverName][x][y] = item;
      });
      console.log(`Построение глобальной карты для ${serverName} завершено`);
      controlStateEventsList(serverName).then((events) => {
        console.log(`Игровые события на ${serverName} посчитаны`);
      });
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
