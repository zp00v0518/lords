import createUnit from "../createUnit.js";
import army_types from "../../baseArmy/army_types.js";
import type_resources from "../../../resources/type_resources.js";
import types_races from "../../../race/types_races.js";
const race = types_races.rampart;

function createDendroid(unitInfo, up = 0) {
  let cost = {
    [type_resources.gold]: 500
  };
  let hp = 50;
  let lvl = 5;
  if (up) {
    cost[type_resources.gold] = 550;
    // lvl += 0.5;
    hp = 55;
  }
  return createUnit({
    unitInfo,
    type: army_types.pex,
    hp,
    cost,
    lvl,
    race,
    up
  });
}
export default createDendroid;
