const createUnit = require('../createUnit');
const army_types = require('../../Army/army_types');
const type_resources = require('../../../resources/type_resources');
const types_races = require('../../../race/types_races');
const race = types_races.rampart;

function createDendroid(lvl = 1) {
  if (lvl === 1) {
    const cost = {
      [type_resources.gold]: 500
    };
    return createUnit({
      name: 'dendroid',
      type: army_types.pex,
      health: 50,
      cost,
      lvl,
      race
    });
  } else if (lvl === 2) {
    const cost = {
      [type_resources.gold]: 550
    };
    return createUnit({
      name: 'dendroid',
      type: army_types.pex,
      health: 55,
      cost,
      lvl,
      race
    });
  }
}
module.exports = createDendroid;
