const schema = require('../workWithMongoDB/schema');

const Town = {
  classInstance: schema.document.class.town,
  baseBuilding : {
    parent: 'town',
    lvl: 0,
  },
  listBuilding: ['storage', "fort", "market", "tavern"] // по идее нужно будет  удалить
};

module.exports = Town;