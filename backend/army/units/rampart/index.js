const createKentavr = require('./kentavr');
const createGnom = require('./gnom');
const createElf = require('./elf');
const createPegas = require('./pegas');
const createDendroid = require('./dendroid');
const createUnicorn = require('./unicorn');
const createGreenDragon = require('./green_dragon');
const listArmy = require('./list');

const units = {
  [listArmy.kentavr]: createKentavr(0),
  [listArmy.kentavr_2]: createKentavr(1),
  [listArmy.gnom]: createGnom(0),
  [listArmy.gnom_2]: createGnom(1),
  [listArmy.elf]: createElf(0),
  [listArmy.elf_2]: createElf(1),
  [listArmy.pegas]: createPegas(0),
  [listArmy.pegas_2]: createPegas(1),
  [listArmy.dendroid]: createDendroid(0),
  [listArmy.dendroid_2]: createDendroid(1),
  [listArmy.unicorn]: createUnicorn(0),
  [listArmy.unicorn_2]: createUnicorn(1),
  [listArmy.green_dragon]: createGreenDragon(0),
  [listArmy.green_dragon_2]: createGreenDragon(1)
};

module.exports = units;
