const globalCalcUnit = require("./globalCalcUnit");
const calcValueUnitInBarraks = require("./calcValueUnitInBarraks");
const checkUnitInBarraks = require("./checkUnitInBarraks");
const changeArmyOnRegion = require("./changeArmyOnRegion");
const army = require('./baseArmy')
const createArmyForBattle = require('./createArmyForBattle')

module.exports = {
  createArmyForBattle,
  globalCalcUnit,
  calcValueUnitInBarraks,
  checkUnitInBarraks,
  changeArmyOnRegion,
  ...army
};
