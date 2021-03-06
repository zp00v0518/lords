// создает коллекцию globalMap в БД
require('dotenv').config(); // парсит ENV файл
const { getRandomNumber } = require('template_func');
const Insert = require('../workWithMongoDB/insertDB.js');
const schema = require('../workWithMongoDB/schema.js');
const gameVariable = require('../variables/game_variables.js');
const createMine = require('../region/mine/createMine.js');
const config = require('../config/config.js');
const WorldMap = require('../globalMap/WorldMap');
const createZoneControlToDB = require('../zoneControl/methods/createZoneControlToDB')
const serverList = config.db.collections.servers;
const insertDB = new Insert();

const numSectionGlobalMap = gameVariable.numSectionGlobalMap;
const numSectionRegionMap = gameVariable.numSectionRegionMap;
const GlobalMap = [];
const coordsMine = []; // возможные координаты шахт на regionMap
const Region = require('../region/Region');

getPositionMine();
// создает перечень возможных координат шахт для regionMap
function getPositionMine() {
  for (let i = 1; i < 4; i++) {
    for (let h = 1; h < 4; h++) {
      var f = {
        x: i,
        y: h
      };
      if (i === 2 && h === 2) {
        break;
      }
      coordsMine.push(f);
    }
  }
}

// возвращает массив координат, где будут находится шахты
function getArrPosition() {
  let positionArr = [];
  while (positionArr.length < 4) {
    let position = Math.floor(Math.random() * coordsMine.length);
    let h = positionArr.includes(position);
    if (!h) {
      positionArr.push(position);
    }
  }
  return positionArr;
}

function createRegionMap() {
  var regionMap = [];
  var countSection = 0;
  // создаю сетку региона
  for (let i = 0; i < numSectionRegionMap; i++) {
    let row = [];
    regionMap.push(row);
    for (let h = 0; h < numSectionRegionMap; h++) {
      let section = {};
      section.id = countSection++;
      section.x = i;
      section.y = h;
      section.type = Region.types.forest.id; // индекс леса
      section.sector = {};
      // центр всегда является замком
      if (i == 2 && h == 2) {
        section.type = Region.types.town.id; // индекс замка
      }
      regionMap[i][h] = section;
    }
  }
  // определаю положение шахт на карте
  var d = getArrPosition();
  for (let k = 0; k < d.length; k++) {
    let index = d[k];
    let x = coordsMine[index].x;
    let y = coordsMine[index].y;
    regionMap[x][y].type = Region.types.mine.id; // индекс шахты
    const mine = createMine(x, y);
    mine.is_default = true;
    regionMap[x][y].sector = mine;
  }
  return regionMap;
}

// конструктор региона
function createRegion() {
  var Region = {};
  Region = createRegionMap();

  return Region;
}

function createGlobalMap() {
  serverList.forEach(server => {
    let countRegion = 0;
    const serverName = server.collectionName;
    GlobalMap[serverName] = [];
    for (let i = 0; i < numSectionGlobalMap; i++) {
      let row = [];
      GlobalMap[serverName].push(row);
      for (let h = 0; h < numSectionGlobalMap; h++) {
        let sector = {};
        sector.class = schema.document.class.map;
        sector.serverName = serverName;
        sector.id = countRegion++;
        sector.type = WorldMap.types.empty.id;
        sector.x = i;
        sector.y = h;
        sector.region = createRegion();
        sector.control = createZoneControlToDB();
        // sector.listUpgrade = [];
        let persent = getRandomNumber(100);
        if (persent <= 2) {
          sector.type = WorldMap.types.nishtyak.id;
        }
        row.push(sector);
      }
    }
  });
  startInsertToDB();
}

function recursiveOne(i, arr, serverName, callback) {
  if (i < arr.length) {
    insertDB.one({ collectionName: serverName, doc: arr[i] }, result => {
      console.log(result.ops[0].id);
      i++;
      recursiveOne(i, arr, serverName, callback);
    });
  } else {
    callback();
  }
}

function recursiveTwo(h, i, arr, serverName, callback) {
  if (h < arr.length) {
    let nextArr = arr[h];
    recursiveOne(i, nextArr, serverName, () => {
      h++;
      recursiveTwo(h, i, arr, serverName, callback);
    });
  } else {
    callback();
  }
}

function recursiveTree(a, h, i, serverList, callback) {
  if (a < serverList.length) {
    const serverName = serverList[a].collectionName;
    let nextArr = GlobalMap[serverName];
    recursiveTwo(h, i, nextArr, serverName, () => {
      a++;
      recursiveTree(a, h, i, serverList, callback);
    });
  } else {
    callback();
  }
}
createGlobalMap();

function startInsertToDB() {
  setTimeout(function() {
    insertDB.mongo.db.dropDatabase(result => {
      console.log('База данных удалена');
      console.log('Создание новой...');
      recursiveTree(0, 0, 0, serverList, () => {
        console.log('done');
        insertDB.close();
      });
    });
  }, 4000);
}
