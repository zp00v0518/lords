import globalCalcUnit from './globalCalcUnit.js'
import calcValueUnitInBarraks from './calcValueUnitInBarraks.js'
import checkUnitInBarraks from './checkUnitInBarraks.js'
import changeArmyOnRegion from './changeArmyOnRegion.js'
import { Army, createArmy, createStackItemTemplate, getArmyRange } from './baseArmy/index.js'
import createArmyForBattle from './createArmyForBattle.js'
import { getLostArmyAfterBattle } from './methods/index.js'

export {
  createArmyForBattle,
  globalCalcUnit,
  calcValueUnitInBarraks,
  checkUnitInBarraks,
  changeArmyOnRegion,
  Army,
  createArmy,
  createStackItemTemplate,
  getArmyRange,
  getLostArmyAfterBattle
}
