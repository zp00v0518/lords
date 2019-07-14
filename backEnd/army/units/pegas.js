const createUnit = require('./createUnit');
const army_types = require('../Army/army_types');
const type_resources = require('../../resources/type_resources');

const cost = {
  [type_resources.gold]: 300
};

const pegas = createUnit({
  name: 'pegas',
  type: army_types.kon,
  health: 40,
  cost
});
module.exports = pegas;
