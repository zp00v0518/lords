const typeList = require('../types').list;
const createHeroes = require('../createHeroes');
const images = require('./images');
const types_race = require('../../race/types_races');

const rampart = {
  0: createHeroes({
    type: typeList[0],
    img: images.kir,
    name: 'Kirr',
    race: types_race.rampart
  }),
  1: createHeroes({
    type: typeList[1],
    img: images.klency,
    name: 'Klency',
    race: types_race.rampart
  }),
  2: createHeroes({
    type: typeList[2],
    img: images.elezar,
    name: 'Elezar',
    race: types_race.rampart
  })
};

module.exports = rampart;
