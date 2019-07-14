const createUnit = require('./createUnit');
const army_types = require('../Army/army_types');
const type_resources = require('../../resources/type_resources');

const cost = {
  [type_resources.gold]: 600,
  [type_resources.gem]: 1
};

const unicor = createUnit({
  name: 'unicor',
  type: army_types.kon,
  health: 60,
  cost
});
module.exports = unicor;
