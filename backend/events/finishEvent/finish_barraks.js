import getParamsForFinish from "./getParamsForFinish.js";
import { calcValueUnitInBarraks } from "../../army/index.js";

function finishBarraks(barraks, eventData) {
  const { buildingInfo, nextLvl } = getParamsForFinish(eventData);
  const nextBuilding = buildingInfo.lvl[nextLvl];
  barraks.lvl = buildingInfo.lvl[nextLvl] ? nextLvl : barraks.lvl;
  calcValueUnitInBarraks(barraks);
  const effect = nextBuilding.effect.addValue;
  barraks.work.addValue = effect;
  barraks.upgrade.is = false;
  barraks.work.is = true;
  return barraks;
}

export default finishBarraks;
