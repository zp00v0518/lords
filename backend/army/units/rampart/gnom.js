import createUnit from "../createUnit.js";
import army_types from "../../baseArmy/army_types.js";
import type_resources from "../../../resources/type_resources.js";
import types_races from "../../../race/types_races.js";
const race = types_races.rampart;

function createGnom(unitInfo, up = 0) {
  let cost = {
    [type_resources.gold]: 200
  };
  let hp = 20;
  let lvl = 2;
  if (up) {
    // lvl += 0.5;
    cost[type_resources.gold] = 225;
    hp = 25;
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
module.exports = createGnom;

export default createGnom
