import createUnit from "../createUnit.js";
import army_types from "../../baseArmy/army_types.js";
import type_resources from "../../../resources/type_resources.js";
import types_races from "../../../race/types_races.js";
const race = types_races.rampart;

function createPegas(unitInfo, up = 0) {
  let cost = {
    [type_resources.gold]: 400
  };
  let hp = 40;
  let lvl = 4;
  if (up) {
    cost[type_resources.gold] = 450;
    // lvl += 0.5;
    hp = 45;
  }

  return createUnit({
    unitInfo,
    type: army_types.kon,
    hp,
    cost,
    lvl,
    race,
    up
  });
}
export default createPegas
