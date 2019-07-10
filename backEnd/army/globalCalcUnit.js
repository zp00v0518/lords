const Army = require('../army/Army');
const calcValueUnitInBarraks = require('./calcValueUnitInBarraks');

function globalCalcUnit(town) {
  const list = Army.list;
  Object.keys(list).forEach(key => {
    const item = town[key];
    calcValueUnitInBarraks(item);
  });
}

module.exports = globalCalcUnit;
