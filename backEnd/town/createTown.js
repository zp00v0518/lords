const tube = require("../tube.js");
const listMine = ["gold", "wood", "ore", "gem"];

function createTown(options) {
  const townName = options.townName || "New Castle";
  const newTown = Town(townName, listMine);
  const town = {
    townName: newTown.name,
    storage: newTown.storage,
    regionMap: null
  };
  //если замок первый, то создается регион со стандартными шахтами и их положением
  if (options.status == "new") {
    town.regionMap = createRegionMap();
  }
  return town;
}

function createRegionMap() {
  const numSectionRegionMap = gameVariables.numSectionRegionMap;
  const { createMine } = tube;
  const regionMap = [];
  let countSection = 0;
  const coordsMine = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 3, y: 3 },
    { x: 1, y: 3 }
  ];

  //создаю сетку региона
  for (let i = 0; i < numSectionRegionMap; i++) {
    let row = [];
    regionMap.push(row);
    for (let h = 0; h < numSectionRegionMap; h++) {
      let section = {};
      section.id = countSection++;
      section.x = i;
      section.y = h;
      section.type = 0; //индекс леса
      //центр всегда является замком
      if (i == 2 && h == 2) {
        section.type = 1; //индекс замка
      }
      regionMap[i][h] = section;
    }
  }
  //определаю положение шахт на карте
  for (let k = 0; k < coordsMine.length; k++) {
    let x = coordsMine[k].x;
    let y = coordsMine[k].y;
    regionMap[x][y].type = 2; //индекс шахты
    regionMap[x][y].mine = createMine(); //создается рандомный тип шахты
    regionMap[x][y].mine.type = listMine[k]; //исправляю рандомный тип шахты на установленный
  }
  return regionMap;
}

function Town(townName, listMine) {
  const { createStorage } = tube;
  const town = {
    storage: createStorage(),
    name: townName
  };
  return town;
}

module.exports = createTown;
