const globalCalcUnit = require("./globalCalcUnit");
const calcValueUnitInBarraks = require("./calcValueUnitInBarraks");
const checkUnitInBarraks = require("./checkUnitInBarraks");
const changeArmyOnRegion = require("./changeArmyOnRegion");
const army = require('./baseArmy')

module.exports = {
  globalCalcUnit,
  calcValueUnitInBarraks,
  checkUnitInBarraks,
  changeArmyOnRegion,
  ...army
};
