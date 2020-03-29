const createUnit = require("../createUnit");
const army_types = require("../../Army/army_types");
const type_resources = require("../../../resources/type_resources");
const types_races = require("../../../race/types_races");
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
