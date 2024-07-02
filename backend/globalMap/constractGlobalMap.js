// составляю массив карты из данных хранящихся в БД
// чтобы не обращаться постоянно в БД

// const { findInDB } = require("../tube.js");
import config from '../config/config.js';
import schema from '../workWithMongoDB/schema.js';
import findInDB from "../workWithMongoDB/findInDB.js";
import { controlStateEventsList } from '../events/index.js';
import needFields from './db/needFields.js';
const find = new findInDB();
const GlobalMap = {};
const serverList = config.db.collections.servers;

function constractGlobalMap() {
  serverList.forEach(async function (server) {
    const serverName = server.collectionName;
    GlobalMap[serverName] = [];
    for (let i = 0; i < global.gameVariables.numSectionGlobalMap; i++) {
      const row = [];
      GlobalMap[serverName].push(row);
      for (let h = 0; h < global.gameVariables.numSectionGlobalMap; h++) {
        const region = 0;
        GlobalMap[serverName][i][h] = region;
      }
    }
    console.time('start');
    const findOptions = {
      collectionName: serverName,
      query: { class: schema.document.class.map },
      needFields
    };
    const result = await find.all(findOptions);
    const regionsArr = result.result;
    regionsArr.forEach(item => {
      const x = item.x;
      const y = item.y;
      GlobalMap[serverName][x][y] = item;
    });
    const str = `Построение глобальной карты для ${serverName} завершено`;
    // console.log( '%c%s', 'color: green; font: 1.2rem/1 Tahoma;', str );
    console.log(str);
    await controlStateEventsList(serverName);
    console.log(`Игровые события на ${serverName} посчитаны`);
    console.timeEnd('start');
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

export default returnGlobalMap()
