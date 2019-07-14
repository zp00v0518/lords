const createUnit = require('./createUnit');
const army_types = require('../Army/army_types');
const type_resources = require('../../resources/type_resources');
const types_races = require('../../race/types_races');
const race = types_races.rampart;

function createKentavr(lvl = 1) {
  if (lvl === 1) {
    const cost = {
      [type_resources.gold]: 100
    };
    return createUnit({
      name: 'kentavr',
      type: army_types.kon,
      health: 10,
      cost,
      lvl,
      race
    });
  } else if (lvl === 2) {
    const cost = {
      [type_resources.gold]: 125
    };
    return createUnit({
      name: 'kentavr',
      type: army_types.kon,
      health: 12,
      cost,
      lvl,
      race
    });
  }
}
module.exports = createKentavr;
