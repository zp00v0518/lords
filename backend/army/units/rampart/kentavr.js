const createUnit = require("../createUnit");
const army_types = require("../../Army/army_types");
const type_resources = require("../../../resources/type_resources");
const types_races = require("../../../race/types_races");
const race = types_races.rampart;

function createKentavr(up = 0) {
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
    name: "kentavr",
    type: army_types.kon,
    hp,
    cost,
    lvl,
    race,
    up
  });
}
module.exports = createKentavr;
