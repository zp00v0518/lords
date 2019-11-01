function calcValueUnitInBarraks(barraks, timeEnd = new Date().getTime()) {
  const perTime = gameVariables.timer.perTime;
  const workInfo = barraks.work;
  if (workInfo.lastCalc !== 0) {
    const ost = timeEnd - workInfo.lastCalc;
    const d = (workInfo.addValue / perTime) * ost;
    workInfo.nowValue += d;
    workInfo.lastCalc = timeEnd;
  }
  workInfo.lastCalc = timeEnd;
}

module.exports = calcValueUnitInBarraks;
