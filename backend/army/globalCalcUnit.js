const { Army } = require("../army/army");
const calcValueUnitInBarraks = require("./calcValueUnitInBarraks");

function globalCalcUnit(town) {
  const list = Army.armyBuildings;
  Object.keys(list).forEach(key => {
    const item = town[key];
    if (item.work.is) {
      calcValueUnitInBarraks(item);
    }
  });
}

module.exports = globalCalcUnit;
