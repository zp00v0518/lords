const createKentavr = require("./kentavr");
const createGnom = require("./gnom");
const createElf = require("./elf");
const createPegas = require("./pegas");
const createDendroid = require("./dendroid");
const createUnicorn = require("./unicorn");
const createGreenDragon = require("./green_dragon");
const listArmy = require("./list");

const units = {
  [listArmy.kentavr]: createKentavr(listArmy.kentavr, 0),
  [listArmy.kentavr_2]: createKentavr(listArmy.kentavr_2, 1),
  [listArmy.gnom]: createGnom(listArmy.gnom, 0),
  [listArmy.gnom_2]: createGnom(listArmy.gnom_2, 1),
  [listArmy.elf]: createElf(listArmy.elf, 0),
  [listArmy.elf_2]: createElf(listArmy.elf_2, 1),
  [listArmy.pegas]: createPegas(listArmy.pegas, 0),
  [listArmy.pegas_2]: createPegas(listArmy.pegas_2, 1),
  [listArmy.dendroid]: createDendroid(listArmy.dendroid, 0),
  [listArmy.dendroid_2]: createDendroid(listArmy.dendroid_2, 1),
  [listArmy.unicorn]: createUnicorn(listArmy.unicorn, 0),
  [listArmy.unicorn_2]: createUnicorn(listArmy.unicorn_2, 1),
  [listArmy.green_dragon]: createGreenDragon(listArmy.green_dragon, 0),
  [listArmy.green_dragon_2]: createGreenDragon(listArmy.green_dragon_2, 1)
};

module.exports = units;
