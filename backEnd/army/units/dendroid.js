const createUnit = require('./createUnit');
const army_types = require('../Army/army_types');
const type_resources = require('../../resources/type_resources');

const cost = {
  [type_resources.gold]: 400
};

const dendroid = createUnit({
  name: 'dendroid',
  type: army_types.pex,
  health: 50,
  cost
});
module.exports = dendroid;
