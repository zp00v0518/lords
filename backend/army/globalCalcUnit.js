import { Army } from "./baseArmy/index.js";
import calcValueUnitInBarraks from "./calcValueUnitInBarraks.js";

function globalCalcUnit(town) {
  const list = Army.armyBuildings;
  Object.keys(list).forEach(key => {
    const item = town[key];
    if (item.work.is) {
      calcValueUnitInBarraks(item);
    }
  });
}

export default globalCalcUnit;
