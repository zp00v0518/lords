const createUnit = require('./createUnit');
const army_types = require('../Army/army_types');
const type_resources = require('../../resources/type_resources');

const cost = {
  [type_resources.gold]: 200
};

const gnom = createUnit({
  name: 'gnom',
  type: army_types.pex,
  health: 20,
  cost
});
module.exports = gnom;
