const typeList = require('../types').list;
const createHeroes = require('../createHeroes');
const images = require('./images');

const rampart = {
  0: createHeroes({
    type: typeList[0],
    img: images.kir,
    name: 'Kirr'
  }),
  1: createHeroes({
    type: typeList[1],
    img: images.klency,
    name: 'Klency'
  }),
  2: createHeroes({
    type: typeList[2],
    img: images.elezar,
    name: 'Elezar'
  })
};

module.exports = rampart;
