const globalCalcUnit = require("./globalCalcUnit");
const calcValueUnitInBarraks = require("./calcValueUnitInBarraks");
const checkUnitInBarraks = require("./checkUnitInBarraks");
const army = require('./Army')

module.exports = {
  globalCalcUnit,
  calcValueUnitInBarraks,
  checkUnitInBarraks,
  ...army
};
