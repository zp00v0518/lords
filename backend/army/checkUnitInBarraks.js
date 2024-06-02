const calcValueUnitInBarraks = require("./calcValueUnitInBarraks");

function checkUnitInBarraks(barrak, num) {
  calcValueUnitInBarraks(barrak);
  return num <= Math.floor(barrak.work.nowValue);
}

module.exports = checkUnitInBarraks;
