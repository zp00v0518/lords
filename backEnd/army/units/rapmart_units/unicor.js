const createUnit = require('../createUnit');
const army_types = require('../../Army/army_types');
const type_resources = require('../../../resources/type_resources');
const types_races = require('../../../race/types_races');
const race = types_races.rampart;

function createPegas(lvl = 1) {
  if (lvl === 1) {
    const cost = {
      [type_resources.gold]: 600,
      [type_resources.gem]: 600
    };
    return createUnit({
      name: 'pegas',
      type: army_types.kon,
      health: 60,
      cost,
      lvl,
      race
    });
  } else if (lvl === 2) {
    const cost = {
      [type_resources.gold]: 650,
      [type_resources.gem]: 1
    };
    return createUnit({
      name: 'pegas',
      type: army_types.kon,
      health: 65,
      cost,
      lvl,
      race
    });
  }
}
module.exports = createPegas;