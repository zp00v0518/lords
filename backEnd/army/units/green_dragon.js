const createUnit = require('./createUnit');
const army_types = require('../Army/army_types');
const type_resources = require('../../resources/type_resources');

const cost = {
  [type_resources.gold]: 1500,
  [type_resources.crystal]: 2
};

const green_dragon = createUnit({
  name: 'green_dragon',
  type: army_types.kon,
  health: 100,
  cost
});
module.exports = green_dragon;
