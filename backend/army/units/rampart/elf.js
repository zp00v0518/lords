import createUnit from "../createUnit.js";
import army_types from "../../baseArmy/army_types.js";
import type_resources from "../../../resources/type_resources.js";
import types_races from "../../../race/types_races.js";
const race = types_races.rampart;

function createElf(unitInfo, up = 0) {
  let cost = {
    [type_resources.gold]: 300
  };
  let hp = 30;
  let lvl = 3;
  if (up) {
    cost[type_resources.gold] = 350;
    // lvl += 0.5;
    hp = 35;
  }
  return createUnit({
    unitInfo,
    type: army_types.arch,
    hp,
    cost,
    lvl,
    race,
    up
  });
}
export default createElf
