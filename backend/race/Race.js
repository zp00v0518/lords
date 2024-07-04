// const mineTypeList = require("../region/mine/Mine.js").typeList;
import { Rampart } from "./Rampart/index.js"; // [process] 
import types_races from "./types_races.js";
import { Heroes } from "../heroes/index.js"; // [process] 
import template_func from 'template_func'
const { getRandomNumber } = template_func;

const Race = {
  types: types_races,
  typeList: ["rampart"],
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

export default Race