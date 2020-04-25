const globalCalcUnit = require("./globalCalcUnit");
const calcValueUnitInBarraks = require("./calcValueUnitInBarraks");
const checkUnitInBarraks = require("./checkUnitInBarraks");
const changeArmyOnRegion = require("./changeArmyOnRegion");
const army = require('./Army')

module.exports = {
  globalCalcUnit,
  calcValueUnitInBarraks,
  checkUnitInBarraks,
  changeArmyOnRegion,
  ...army
};
