const army_types = require("./army_types");
const race_types = require("../../race/types_races");
const rampart_units = require("../units/rampart");
const schema = require("../../workWithMongoDB/schema");
const type = schema.document.class;
const createStackItemTemplate = require("./createStackItemTemplate");

const Army = {
  army_length: 7,
  types: army_types,
  armyBuildings: {
    barraks_1: { name: type.barraks + "_1", maxLvl: 2 },
    barraks_2: { name: type.barraks + "_2", maxLvl: 2 },
    barraks_3: { name: type.barraks + "_3", maxLvl: 2 },
    barraks_4: { name: type.barraks + "_4", maxLvl: 2 },
    barraks_5: { name: type.barraks + "_5", maxLvl: 2 },
    barraks_6: { name: type.barraks + "_6", maxLvl: 2 },
    barraks_7: { name: type.barraks + "_7", maxLvl: 2 }
  },
  army_range: {
    base: [1000, 2000],
    hero: [1000, 1000]
  },
  race: {
    [race_types.rampart]: rampart_units
  },
  getUnitsFromRace(race_name, lvlArr = [], withUp = true) {
    const { race } = this;
    if (lvlArr.length === 0) return Object.values(race[race_name]);
    let result = [];
    const units = Object.values(race[race_name]);
    lvlArr.forEach(needLvl => {
      units.forEach(unit => {
        if (unit.lvl === needLvl) {
          if (withUp) {
            result.push(unit);
            return;
          }
          if (!unit.up) {
            result.push(unit);
            return;
          }
        }
      });
    });
    return result;
  },
  getOneUnitFromRace(race_name, unit_name) {
    const units = this.getUnitsFromRace(race_name);
    return units.find(i => i.name === unit_name);
  },
  getTotalCost(cost, unitSum) {
    return Object.keys(cost).reduce((result, key) => {
      const item = cost[key];
      result[key] = unitSum * item;
      return result;
    }, {});
  },
  getUnitInfo(raceName, unitName) {
    return this.race[raceName][unitName];
  },
  getIconUnit({ unit, iconType = "ico", ext = ".gif" }) {
    const { race, name } = unit;
    return `img/units/${race}/${iconType}/${name}${ext}`;
  },
  mergeTwoArmy(target = [], second = []) {
    const { army_length } = this;
    const result = {
      status: false,
      cause: "full_army"
    };
    if (target.length > army_length) return result;
    for (let i = 0; i < second.length; i++) {
      const stack = second[i];
      const { name } = stack;
      const template = createStackItemTemplate();
      Object.keys(template).forEach(key => {
        template[key] = stack[key];
      });
      const targetStack = target.find(i => i.name === name);
      if (!targetStack && target.length < army_length) {
        target.push(template);
        second.splice(i, 1);
        i--;
      } else if (targetStack) {
        targetStack.count += stack.count;
        stack.count = 0;
        second.splice(i, 1);
        i--;
      }
      if (target.length > army_length) break;
    }
    result.status = true;
    result.target = target;
    result.outcoming = second;
    return result;
  }
};

module.exports = Army;
