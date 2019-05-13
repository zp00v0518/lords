const schema = require('../workWithMongoDB/schema');
const type = schema.document.class;
const Town = {
  classInstance: schema.document.class.town,
  baseBuilding: {
    parent: 'town',
    lvl: 0
  },
  listBuilding: [
    type.storage,
    type.market,
    type.fort,
    type.quild,
    type.tavern,
    'manage',
    'barracks_1',
    'barracks_2',
    'barracks_3',
    'barracks_4',
    'barracks_5',
  ]
};

module.exports = Town;
