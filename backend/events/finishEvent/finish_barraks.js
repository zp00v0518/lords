const getParamsForFinish = require("./getParamsForFinish");
const { calcValueUnitInBarraks } = require("../../army");
const template = require("template_func");
const log = new template.Log(__filename);

function finishBarraks(barraks, eventData) {
  const { buildingInfo, nextLvl } = getParamsForFinish(eventData);
  const nextBuilding = buildingInfo.lvl[nextLvl];
  barraks.lvl = buildingInfo.lvl[nextLvl] ? nextLvl : barraks.lvl;
  calcValueUnitInBarraks(barraks);
  const effect = nextBuilding.effect.addValue;
  barraks.work.addValue = effect;
  barraks.upgrade.is = false;
  barraks.work.is = true;
}

module.exports = finishBarraks;
