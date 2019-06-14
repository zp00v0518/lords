const Race = require('../../race/Race');
const race_list = Race.typeList;
const Town = require('../../town/Town');
const town_list = Town.listBuildings;
const rampart = require('./rampat');
const elf = require('./elf');

const town = {
  race: {
    [race_list[0]]: { ...rampart },
    [race_list[1]]: { ...elf }
  }
};

module.exports = town;
