// const mineTypeList = require("../region/mine/Mine.js").typeList;
const Rampart = require('./Rampart');
const types_races = require('./types_races');
const { getRandomNumber } = require('template_func');
const { Heroes } = require('../heroes');

const Race = {
  types: types_races,
  typeList: ['rampart'],
  // typeList: ['rampart', 'elf'],
  [`${types_races.rampart}`]: Rampart,
  elf: {},
  heroes: Heroes,
  getRandom() {
    const index = getRandomNumber(0);
    // const index = getRandomNumber(this.typeList.length - 1);
    const name = this.typeList[index];
    return { name, index };
  },
  getRace(race_name) {
    const { types } = this;
    if (race_name) return this[race_name];
    const arr = Object.keys(types).map(key => {
      const type = types[key];
      const race = this[type];
      return race;
    });
    return arr;
  }
};
module.exports = Race;
