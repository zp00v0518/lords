const createUnit = require('./createUnit');
const army_types = require('../Army/army_types');
const type_resources = require('../../resources/type_resources');

const cost = {
  [type_resources.gold]: 300
};

const elf = createUnit({
  name: 'elf',
  type: army_types.arch,
  health: 30,
  cost
});
module.exports = elf;
