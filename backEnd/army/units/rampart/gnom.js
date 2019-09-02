const createUnit = require('../createUnit');
const army_types = require('../../Army/army_types');
const type_resources = require('../../../resources/type_resources');
const types_races = require('../../../race/types_races');
const race = types_races.rampart;

function createGnom(lvl = 1) {
  if (lvl === 1) {
    const cost = {
      [type_resources.gold]: 200
    };
    return createUnit({
      name: 'gnom',
      type: army_types.pex,
      hp: 20,
      cost,
      lvl,
      race
    });
  } else if (lvl === 2) {
    const cost = {
      [type_resources.gold]: 225
    };
    return createUnit({
      name: 'gnom',
      type: army_types.pex,
      hp: 25,
      cost,
      lvl,
      race
    });
  }
}
module.exports = createGnom;
