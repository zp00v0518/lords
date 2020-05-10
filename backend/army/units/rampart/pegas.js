const createUnit = require("../createUnit");
const army_types = require("../../baseArmy/army_types");
const type_resources = require("../../../resources/type_resources");
const types_races = require("../../../race/types_races");
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
module.exports = createPegas;
