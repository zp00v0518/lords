const { getRandomNumber } = require("template_func");
const baseMine = require("../../variables/game_variables.js").mine;

const UpgradeSection = require("../../town/buildings/upgradeSection.js"); //такой способ пожключения выбран из-за того, что модуль "createMine"
//используется при запуске файлов в "prepareToStart"

function Mine(type, lvl = 0) {
  this.parent = baseMine.parent;
  this.type = type;
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
    let index = getRandomNumber(baseMine.mineTypeList.length - 1);
    let mine = new Mine(baseMine.mineTypeList[index]);
    return mine;
  } else {
    let mine = new Mine(type);
    return mine;
  }
}

module.exports = createMine;
