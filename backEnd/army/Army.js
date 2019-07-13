const schema = require('../workWithMongoDB/schema');
const type = schema.document.class;

const Army = {
  types: {
    fly: {
      name: 'fly',
    },
    kon: {
      name: 'kon',
    },
    pex: {
      name: 'pex',
    }
  },
  list: {
    barraks_1: { name: type.barraks + '_1', maxLvl: 2 },
    barraks_2: { name: type.barraks + '_2', maxLvl: 2 },
    barraks_3: { name: type.barraks + '_3', maxLvl: 2 },
    barraks_4: { name: type.barraks + '_4', maxLvl: 2 },
    barraks_5: { name: type.barraks + '_5', maxLvl: 2 },
    barraks_6: { name: type.barraks + '_6', maxLvl: 2 },
    barraks_7: { name: type.barraks + '_7', maxLvl: 2 }
  }
};

module.exports = Army;
