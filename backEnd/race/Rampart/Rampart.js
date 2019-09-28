const mineTypeList = require('../../region/mine/Mine.js').typeList;
const buildings = require('./buildings');
const rampart_units = require('../../army/units/rampart');
const Heroes = require('../../heroes');
const types_races = require('../types_races');

const Rampart = {
  type: types_races.rampart,
  mine: {
    default: [
      mineTypeList[0],
      mineTypeList[1],
      mineTypeList[2],
      mineTypeList[4],
      // для разработки добавил и остальные шахты
      mineTypeList[3],
      mineTypeList[5],
      mineTypeList[6]
    ]
  },
  buildings,
  heroes: Heroes.races.rampart,
  units: rampart_units
};

module.exports = Rampart;

// const coords = {
// guild_5: { x: 380, y: 100, zoom: 10 },
// fort_3: { x: 60, y: 25, zoom: 0 },
// market: { x: 135, y: 300, zoom: 17 },
// storage: { x: 255, y: 325, zoom: 18 },
// tavern: { x: 180, y: 225, zoom: 13 },
// barraks_1_2: { x: 0, y: 235, zoom: 12 },
// barraks_2_2: { x: 0, y: 150, zoom: 10 },
// // rdwf2h: { x: 0, y: 150, zoom: 7 },
// barraks_3_2: { x: 665, y: 95, zoom: 6 },
// barraks_4_2: { x: 290, y: 25, zoom: 4 },
// barraks_5_2: { x: 55, y: 150, zoom: 11 },
// barraks_6_2: { x: 370, y: 90, zoom: 3 },
// barraks_7_2: { x: 490, y: 0, zoom: 2 },
// rgar2a: { x: 550, y: 295, zoom: 19 },
// rhou1: { x: 320, y: 235, zoom: 15, is_default: true },
// rhou2: { x: 290, y: 235, zoom: 14, is_default: true },
// rhou3: { x: 300, y: 190, zoom: 9, is_default: true },
// rhou4: { x: 250, y: 170, zoom: 8, is_default: true },
// raid: { x: 530, y: 100, zoom: 5 },
// hall_4: { x: 535, y: 180, zoom: 16 }
// };
