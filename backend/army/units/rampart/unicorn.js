import createUnit from "../createUnit.js";
import army_types from "../../baseArmy/army_types.js";
import type_resources from "../../../resources/type_resources.js";
import types_races from "../../../race/types_races.js";
const race = types_races.rampart;

function createUnicorn(unitInfo, up = 0) {
  let cost = {
    [type_resources.gold]: 600,
    [type_resources.gem]: 1
  };
  let hp = 60;
  let lvl = 6;
  if (up) {
    cost[type_resources.gold] = 650;
    // lvl += 0.5;
    hp = 65;
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
export default createUnicorn
