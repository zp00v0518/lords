const createUnit = require("../createUnit");
const army_types = require("../../Army/army_types");
const type_resources = require("../../../resources/type_resources");
const types_races = require("../../../race/types_races");
const race = types_races.rampart;

function createUnicorn(name, up = 0) {
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
    name,
    type: army_types.kon,
    hp,
    cost,
    lvl,
    race,
    up
  });
}
module.exports = createUnicorn;
