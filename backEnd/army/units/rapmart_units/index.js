const createKentavr = require('./kentavr');
const createGnom = require('./gnom');
const createElf = require('./elf');
const createPegas = require('./pegas');
const createDendroid = require('./dendroid');
const createUnicorn = require('./unicorn');
const createGreenDragon = require('./green_dragon');

const units = {
  kentavr: createKentavr(1),
  kentavr_2: createKentavr(2),
  gnom: createGnom(1),
  gnom_2: createGnom(2),
  elf: createElf(1),
  elf_2: createElf(2),
  pegas: createPegas(1),
  pegas_2: createPegas(2),
  dendroid: createDendroid(1),
  dendroid_2: createDendroid(2),
  unicorn: createUnicorn(1),
  unicorn_2: createUnicorn(2),
  green_dragon: createGreenDragon(1),
  green_dragon_2: createGreenDragon(2)
};

module.exports = units;
