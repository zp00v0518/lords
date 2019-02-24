const { getRandomNumber } = require('template_func');
const baseMine = require('../../variables/game_variables.js').mine;

const UpgradeSection = require('../../town/storage/upgradeSection.js'); //такой способ пожключения выбран из-за того, что модуль "createMine"
//используется при запуске файлов в "prepareToStart"

function Mine(type, x, y, lvl = 0) {
  this.parent = baseMine.parent;
  this.class = baseMine.classInstance;
  this.type = type;
  this.lvl = lvl;
  this.x = x;
  this.y = y;
  this.upgrade = UpgradeSection();
  this.work = {
    is: false, // true
    date: 0, // время изменения is
    bonus: 0,
    addValue: 0
  };
}

function createMine(x, y, type) {
  let mine; 
  if (!type) {
    let index = getRandomNumber(baseMine.typeList.length - 1);
    mine = new Mine(baseMine.typeList[index], x, y);
  } else {
    mine = new Mine(type, x, y);
  }
  return mine;
}

module.exports = createMine;
