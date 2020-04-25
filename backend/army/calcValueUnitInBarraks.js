function calcValueUnitInBarraks(barraks, timeEnd = new Date().getTime()) {
  const addSource = gameVariables.timer.addSource;
  const workInfo = barraks.work;
  if (workInfo.lastCalc !== 0) {
    const ost = timeEnd - workInfo.lastCalc;
    const d = (workInfo.addValue / addSource) * ost;
    workInfo.nowValue += d;
    workInfo.lastCalc = timeEnd;
  }
  workInfo.lastCalc = timeEnd;
}

module.exports = calcValueUnitInBarraks;
