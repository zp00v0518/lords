const typeList = require('../types').list;
const createHeroes = require('../createHeroes');
const images = require('./images');

const rampart = {
  0: createHeroes({
    type: typeList[0],
    progress: [50, 30, 20],
    img: images.kir,
    name: 'Kirr'
  }),
  1: createHeroes({
    type: typeList[1],
    progress: [20, 50, 30],
    img: images.klency,
    name: 'Klency'
  }),
  2: createHeroes({
    type: typeList[2],
    progress: [20, 30, 50],
    img: images.elezar,
    name: 'Elezar'
  })
};

module.exports = rampart;
