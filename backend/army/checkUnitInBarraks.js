import calcValueUnitInBarraks from "./calcValueUnitInBarraks.js";

function checkUnitInBarraks(barrak, num) {
  calcValueUnitInBarraks(barrak);
  return num <= Math.floor(barrak.work.nowValue);
}

export default checkUnitInBarraks;
