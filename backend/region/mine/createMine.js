import { getRandomNumber } from 'template_func';
import game_variables from '../../variables/game_variables.js';
const baseMine = game_variables.mine

import UpgradeSection from '../../town/upgradeSection.js';

function Mine(type, x, y, lvl = 0) {
  this.parent = baseMine.parent;
  this.class = baseMine.classInstance;
  this.type = type;
  this.lvl = lvl;
  this.x = x;
  this.y = y;
  this.upgrade = UpgradeSection();
  this.work = {
    is: true,
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

export default createMine
