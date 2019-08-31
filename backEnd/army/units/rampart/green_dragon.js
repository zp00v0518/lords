const createUnit = require('../createUnit');
const army_types = require('../../Army/army_types');
const type_resources = require('../../../resources/type_resources');
const types_races = require('../../../race/types_races');
const race = types_races.rampart;

function createGreenDragon(lvl = 1) {
  if (lvl === 1) {
    const cost = {
      [type_resources.gold]: 700,
      [type_resources.crystal]: 1
    };
    return createUnit({
      name: 'green_dragon',
      type: army_types.kon,
      hp: 70,
      cost,
      lvl,
      race
    });
  } else if (lvl === 2) {
    const cost = {
      [type_resources.gold]: 750,
      [type_resources.crystal]: 2
    };
    return createUnit({
      name: 'green_dragon',
      type: army_types.kon,
      hp: 75,
      cost,
      lvl,
      race
    });
  }
}
module.exports = createGreenDragon;
