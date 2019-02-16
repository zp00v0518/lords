const { getRandomNumber } = require("template_func");
const baseMine = require("../../variables/game_variables.js").mine;

const UpgradeSection = require("../../town/storage/upgradeSection.js"); //такой способ пожключения выбран из-за того, что модуль "createMine"
//используется при запуске файлов в "prepareToStart"

function Mine(type, lvl = 0) {
  this.parent = baseMine.parent;
  this.class = baseMine.class;
  this.type = type;
  this.lvl = lvl;
  this.upgrade = UpgradeSection();
  this.work = {
    is: false, // true
    date: 0, // время изменения is
    bonus: 0,
    addValue: 0
  };
}

function createMine(type) {
  if (!type) {
    let index = getRandomNumber(baseMine.typeList.length - 1);
    let mine = new Mine(baseMine.typeList[index]);
    return mine;
  } else {
    let mine = new Mine(type);
    return mine;
  }
}

module.exports = createMine;
