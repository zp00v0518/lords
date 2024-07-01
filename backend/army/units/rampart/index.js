import createKentavr from "./kentavr.js";
import createGnom from "./gnom.js";
import createElf from "./elf.js";
import createPegas from "./pegas.js";
import createDendroid from "./dendroid.js";
import createUnicorn from "./unicorn.js";
import createGreenDragon from "./green_dragon.js";
import listArmy from "./list.js";

const units = {
  [listArmy.kentavr.name]: createKentavr(listArmy.kentavr, 0),
  [listArmy.kentavr_2.name]: createKentavr(listArmy.kentavr_2, 1),
  [listArmy.gnom.name]: createGnom(listArmy.gnom, 0),
  [listArmy.gnom_2.name]: createGnom(listArmy.gnom_2, 1),
  [listArmy.elf.name]: createElf(listArmy.elf, 0),
  [listArmy.elf_2.name]: createElf(listArmy.elf_2, 1),
  [listArmy.pegas.name]: createPegas(listArmy.pegas, 0),
  [listArmy.pegas_2.name]: createPegas(listArmy.pegas_2, 1),
  [listArmy.dendroid.name]: createDendroid(listArmy.dendroid, 0),
  [listArmy.dendroid_2.name]: createDendroid(listArmy.dendroid_2, 1),
  [listArmy.unicorn.name]: createUnicorn(listArmy.unicorn, 0),
  [listArmy.unicorn_2.name]: createUnicorn(listArmy.unicorn_2, 1),
  [listArmy.green_dragon.name]: createGreenDragon(listArmy.green_dragon, 0),
  [listArmy.green_dragon_2.name]: createGreenDragon(listArmy.green_dragon_2, 1)
};

export default units;
