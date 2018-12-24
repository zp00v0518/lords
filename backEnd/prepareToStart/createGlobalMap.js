//создает коллекцию globalMap в БД
const { getRandomNumber } = require("template_func");
const insert = require("../workWithMongoDB/insertDB.js");
const gameVariable = require("../variables/game_variables.js");
const createMine = require("../region/mine/createMine.js");
const config = require("../config/config.js");
const serverList = config.db.collections.servers;
const insertDB = new insert();

const numSectionGlobalMap = gameVariable.numSectionGlobalMap;
const numSectionRegionMap = gameVariable.numSectionRegionMap;
const GlobalMap = [];
const coordsMine = []; //возможные координаты шахт на regionMap

function toDb() {
  serverList.forEach(serverName => {
  let countRegion = 0;
    for (let i = 0; i < numSectionGlobalMap; i++) {
      let row = [];
      GlobalMap.push(row);
      for (let h = 0; h < numSectionGlobalMap; h++) {
        let sector = {};
        sector.server = serverName;
        sector.id = countRegion++;
        sector.type = 0;
        sector.x = i;
        sector.y = h;
        sector.region = createRegion();
        sector.listUpgrade = {
          castle: {},
          region: {
            mine: []
          }
        };
        let persent = getRandomNumber(100);
        if (persent <= 10) {
          sector.type = 2;
        }
        GlobalMap[i][h] = sector;
        insertDB.one(
          { collectionName: config.db.collections.map, doc: GlobalMap[i][h] },
          result => {
            console.log(result.ops);
            insertDB.close();
          }
        );
      }
    }
  });
}

setTimeout(toDb, 5000);

getPositionMine();
//создает перечень возможных координат шахт для regionMap
function getPositionMine() {
  for (let i = 1; i < 4; i++) {
    for (let h = 1; h < 4; h++) {
      var f = {
        x: i,
        y: h
      };
      if (i == 2 && h == 2) {
        break;
      }
      coordsMine.push(f);
    }
  }
}

//возвращает массив координат, где будут находится шахты
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
  //создаю сетку региона
  for (let i = 0; i < numSectionRegionMap; i++) {
    let row = [];
    regionMap.push(row);
    for (let h = 0; h < numSectionRegionMap; h++) {
      let section = {};
      section.id = countSection++;
      section.x = i;
      section.y = h;
      section.type = 1; //индекс леса
      //центр всегда является замком
      if (i == 2 && h == 2) {
        section.type = 2; //индекс замка
      }
      regionMap[i][h] = section;
    }
  }
  //определаю положение шахт на карте
  var d = getArrPosition();
  for (let k = 0; k < d.length; k++) {
    let index = d[k];
    let x = coordsMine[index].x;
    let y = coordsMine[index].y;
    regionMap[x][y].type = 3; //индекс шахты
    regionMap[x][y].mine = createMine();
  }
  return regionMap;
}

//конструктор региона
function createRegion(id, sectionMap) {
  var Region = {};
  Region.regionMap = createRegionMap();
  // Region.mapId = sectionMap.id;
  // Region.map_Id = sectionMap._id;
  // Region.mapX = sectionMap.x;
  // Region.mapY = sectionMap.y;
  // Region.type = sectionMap.type;
  // Region.id = id;
  return Region;
}
