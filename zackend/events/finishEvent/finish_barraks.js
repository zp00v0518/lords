const getParamsForFinish = require('./getParamsForFinish');
const calcValueUnitInBarraks = require('../../army/calcValueUnitInBarraks');

function finishBarraks(barraks, eventData) {
  const { buildingInfo, nextLvl } = getParamsForFinish(eventData);
  const nextBuilding = buildingInfo.lvl[nextLvl];
  barraks.lvl = buildingInfo.lvl[nextLvl] ? nextLvl : barraks.lvl;
  calcValueUnitInBarraks(barraks);
  const prevValue = buildingInfo.lvl[nextLvl - 1]
    ? buildingInfo.lvl[nextLvl - 1].effect.addValue
    : 0;
  const effect = nextBuilding.effect.addValue;
  const different = effect - prevValue;
  barraks.work.addValue += different;
  barraks.upgrade.is = false;
}

module.exports = finishBarraks;
