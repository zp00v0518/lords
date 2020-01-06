const createUnit = require("../createUnit");
const army_types = require("../../Army/army_types");
const type_resources = require("../../../resources/type_resources");
const types_races = require("../../../race/types_races");
const race = types_races.rampart;

function createGnom(up = 0) {
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
    name: "gnom",
    type: army_types.pex,
    hp,
    cost,
    lvl,
    race,
    up
  });
}
module.exports = createGnom;
