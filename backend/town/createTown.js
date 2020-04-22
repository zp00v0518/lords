const tube = require('../tube.js');
const Region = require('../region/Region');
const Race = require('../race/Race');
const { createBarraks, createFort, createGuild, createMarket, createTavern, createHall } = require('./buildings');
const { Army, createArmy } = require('../army/Army');
const { gameVariables } = global;
const createStorage = require('./storage/createStorage');
let listMine = [];

function createTown(options) {
  // const { createStorage } = tube;
  const indexRace = options.race || Number(0);
  const race = Race.typeList[indexRace];
  listMine = Race[race].mine.default;
  const storage = createStorage({ status: options.status });
  const hall = createHall();
  const tavern = createTavern({});
  const market = createMarket({});
  const guild = createGuild({});
  const fort = createFort({});
  const town = {
    army: {
      def: false,
      units: []
    },
    class: gameVariables.classInstance.town,
    name: options.name || 'New Castle' + '_' + Math.floor(Math.random() * 1123),
    [storage.class]: storage,
    [hall.class]: hall,
    [fort.class]: fort,
    [guild.class]: guild,
    [market.class]: market,
    [tavern.class]: tavern,
    lvl: options.lvl || 0,
    race: indexRace
  };
  town.sectorId = options.sectorId || '';
  // const sectorId = options.sectorId;
  // if (sectorId) {
  //   town.sectorId = options.sectorId;
  // }
  for (let i = 0; i < 7; i++) {
    const barraks = createBarraks({});
    const key = barraks.class + `_${i + 1}`;
    town[key] = barraks;
    town[key].type = key;
  }
  // если замок первый, то создается регион со стандартными шахтами и их положением
  if (options.status === 'first') {
    town.regionMap = createRegionMap(1);
  }
  return town;
}

function createRegionMap(townIndex = 1) {
  const numSectionRegionMap = gameVariables.numSectionRegionMap;
  const { createMine } = tube;
  const regionMap = [];
  let countSection = 0;
  const coordsMine = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 3, y: 3 },
    { x: 1, y: 3 },
    // для разработки добавил и остальные шахты
    { x: 2, y: 0 },
    { x: 4, y: 2 },
    { x: 2, y: 4 }
  ];
  const range_power_army = Army.army_range.base.map(i => i * townIndex);

  // создаю сетку региона
  for (let i = 0; i < numSectionRegionMap; i++) {
    let row = [];
    regionMap.push(row);
    const armyRace = Race.getRandom();
    const units = Object.values(Race[armyRace.name].units);
    for (let h = 0; h < numSectionRegionMap; h++) {
      let section = {};
      section.id = countSection++;
      section.x = i;
      section.y = h;
      section.type = Region.types.forest.id; // индекс леса
      // const armyRace = Race.getRandom();
      // const units = Object.values(Race[armyRace.name].units);
      const army = createArmy({ range_power_army, units });
      section.army = army;
      // центр всегда является замком
      if (i === 2 && h === 2) {
        section.type = Region.types.town.id; // индекс замка
      }
      regionMap[i][h] = section;
    }
  }
  // определаю положение шахт на карте
  for (let k = 0; k < coordsMine.length; k++) {
    let x = coordsMine[k].x;
    let y = coordsMine[k].y;
    regionMap[x][y].type = Region.types.mine.id; // индекс шахты
    regionMap[x][y].sector = createMine(x, y); // создается рандомный тип шахты
    regionMap[x][y].sector.type = listMine[k]; // исправляю рандомный тип шахты на установленный
  }
  return regionMap;
}

module.exports = createTown;
