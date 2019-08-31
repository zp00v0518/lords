// const mineTypeList = require("../region/mine/Mine.js").typeList;
const Rampart = require('./Rampart');
const types_races = require('./types_races');
const { getRandomNumber } = require('template_func');

const Race = {
  types: types_races,
  typeList: ['rampart', 'elf'],
  rampart: Rampart,
  // rampart: {
  //   mine: {
  //     default: [mineTypeList[0], mineTypeList[1], mineTypeList[2], mineTypeList[6]]
  //   }
  // },
  elf: {},
  getRandom() {
    const index = getRandomNumber(0);
    // const index = getRandomNumber(this.typeList.length - 1);
    const name = this.typeList[name];
    return { name, index };
  }
};
module.exports = Race;
