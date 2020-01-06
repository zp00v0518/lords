const createUnit = require("../createUnit");
const army_types = require("../../Army/army_types");
const type_resources = require("../../../resources/type_resources");
const types_races = require("../../../race/types_races");
const race = types_races.rampart;

function createElf(name, up = 0) {
  let cost = {
    [type_resources.gold]: 300
  };
  let hp = 30;
  let lvl = 3;
  if (up) {
    cost[type_resources.gold] = 350;
    // lvl += 0.5;
    hp = 35;
  }
  return createUnit({
    name,
    type: army_types.arch,
    hp,
    cost,
    lvl,
    race,
    up
  });
}
module.exports = createElf;
