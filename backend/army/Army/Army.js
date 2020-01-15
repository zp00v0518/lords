const army_types = require("./army_types");
const race_types = require("../../race/types_races");
const rampart_units = require("../units/rampart");
const schema = require("../../workWithMongoDB/schema");
const type = schema.document.class;

const Army = {
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
    if (lvlArr.length === 0) return race[race_name];
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
  getTotalCost(cost, unitSum){
    return Object.keys(cost).reduce((result, key)=>{
      const item = cost[key];
      result[key] = unitSum * item;
      return result;
    }, {})
  },
  getUnitInfo(raceName, unitName){
    return this.race[raceName][unitName];
  },
  getIconUnit({unit, iconType = 'ico', ext = ".gif"}) {
    const {race, name} = unit;
    return `img/units/${race}/${iconType}/${name}${ext}`;
  }
};

module.exports = Army;
