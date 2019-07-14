const createKentavr = require('./kentavr');
const createGnom = require('./gnom');
const createElf = require('./elf');
const createPegas = require('./pegas');
const createDendroid = require('./dendroid');
const createUnicorn = require('./unicorn');
const createGreenDragon = require('./green_dragon');
const listArmy = require('./list');

const units = {
  [listArmy.kentavr]: createKentavr(1),
  [listArmy.kentavr_2]: createKentavr(2),
  [listArmy.gnom]: createGnom(1),
  [listArmy.gnom_2]: createGnom(2),
  [listArmy.elf]: createElf(1),
  [listArmy.elf_2]: createElf(2),
  [listArmy.pegas]: createPegas(1),
  [listArmy.pegas_2]: createPegas(2),
  [listArmy.dendroid]: createDendroid(1),
  [listArmy.dendroid_2]: createDendroid(2),
  [listArmy.unicorn]: createUnicorn(1),
  [listArmy.unicorn_2]: createUnicorn(2),
  [listArmy.green_dragon]: createGreenDragon(1),
  [listArmy.green_dragon_2]: createGreenDragon(2)
};

module.exports = units;
