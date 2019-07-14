const createUnit = require('./createUnit');
const army_types = require('../Army/army_types');
const type_resources = require('../../resources/type_resources');

const cost = {
  [type_resources.gold]: 100
};

const kentavr = createUnit({
  name: 'kentavr',
  type: army_types.kon,
  health: 10,
  cost
});
module.exports = kentavr;
