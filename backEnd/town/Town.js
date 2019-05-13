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
    'hall',
    'barracks_1',
    'barracks_2',
    'barracks_3',
    'barracks_4',
    'barracks_5',
    'barracks_6',
    'barracks_7',
  ]
};

module.exports = Town;
