const createUnit = require('./createUnit');
const army_types = require('../Army/army_types');
const type_resources = require('../../resources/type_resources');
const types_races = require('../../race/types_races');
const race = types_races.rampart;

function createElf(lvl = 1) {
  if (lvl === 1) {
    const cost = {
      [type_resources.gold]: 300
    };
    return createUnit({
      name: 'elf',
      type: army_types.arch,
      health: 30,
      cost,
      lvl,
      race
    });
  } else if (lvl === 2) {
    const cost = {
      [type_resources.gold]: 350
    };
    return createUnit({
      name: 'elf',
      type: army_types.arch,
      health: 35,
      cost,
      lvl,
      race
    });
  }
}
module.exports = createElf;
