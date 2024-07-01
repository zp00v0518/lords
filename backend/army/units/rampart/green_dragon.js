import createUnit from "../createUnit.js";
import army_types from "../../baseArmy/army_types.js";
import type_resources from "../../../resources/type_resources.js";
import types_races from "../../../race/types_races.js";
const race = types_races.rampart;

function createGreenDragon(unitInfo, up = 0) {
  let cost = {
    [type_resources.gold]: 700,
    [type_resources.crystal]: 1
  };
  let hp = 200;
  let lvl = 7;
  if (up) {
    cost[type_resources.gold] = 750;
    cost[type_resources.crystal] = 2;
    // lvl += 0.5;
    hp = 300;
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
module.exports = createGreenDragon;

export default createGreenDragon
