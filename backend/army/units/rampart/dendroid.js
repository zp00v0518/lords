const createUnit = require("../createUnit");
const army_types = require("../../Army/army_types");
const type_resources = require("../../../resources/type_resources");
const types_races = require("../../../race/types_races");
const race = types_races.rampart;

function createDendroid(name, up = 0) {
  let cost = {
    [type_resources.gold]: 500
  };
  let hp = 50;
  let lvl = 5;
  if (up) {
    cost[type_resources.gold] = 550;
    // lvl += 0.5;
    hp = 55;
  }
  return createUnit({
    name,
    type: army_types.pex,
    hp,
    cost,
    lvl,
    race,
    up
  });
}
module.exports = createDendroid;
