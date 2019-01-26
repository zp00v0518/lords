const { getRandomNumber } = require("template_func");
const mineTypeList = [
  "gold",
  "wood",
  "ore",
  "sulfur",
  "crystal",
  "mercury",
  "gem"
];
const UpgradeSection = require("../../town/buildings/upgradeSection.js"); //такой способ пожключения выбран из-за того, что модуль "createMine"
//используется при запуске файлов в "prepareToStart"

function Mine(type, index, lvl = 0) {
  this.name = type;
  this.index = index;
  this.lvl = lvl;
  this.upgrade = UpgradeSection();
  this.mining = {
    is: false, // true
    date: 0, // время изменения is
    bonus: 0,
    addValue: 0
  };
}

function createMine(type) {
  if (!type) {
    let index = getRandomNumber(mineTypeList.length - 1);
    let mine = new Mine(mineTypeList[index], index);
    return mine;
  } else {
    let mine = new Mine(type);
    return mine;
  }
}

module.exports = createMine;
