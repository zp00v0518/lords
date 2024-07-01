import createUnit from "../createUnit.js";
import army_types from "../../baseArmy/army_types.js";
import type_resources from "../../../resources/type_resources.js";
import types_races from "../../../race/types_races.js";
const race = types_races.rampart;

function createKentavr(unitInfo, up = 0) {
  let cost = {
    [type_resources.gold]: 100
  };
  let hp = 10;
  let lvl = 1;
  if (up) {
    cost[type_resources.gold] = 125;
    // lvl += 0.5;
    hp = 12;
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
module.exports = createKentavr;

export default createKentavr
