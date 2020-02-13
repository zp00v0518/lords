const createUnit = require("../createUnit");
const army_types = require("../../Army/army_types");
const type_resources = require("../../../resources/type_resources");
const types_races = require("../../../race/types_races");
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
