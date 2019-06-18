const schema = require('../workWithMongoDB/schema');
const type = schema.document.class;
const Town = {
  classInstance: schema.document.class.town,
  baseBuilding: {
    parent: 'town',
    lvl: 1
  },
  // listBuildings: [
  //   type.hall,
  //   type.fort,
  //   type.tavern,
  //   type.market,
  //   type.storage,
  //   type.guild,
  //   type.barraks +'_1',
  //   type.barraks +'_2',
  //   type.barraks +'_3',
  //   type.barraks +'_4',
  //   type.barraks +'_5',
  //   type.barraks +'_6',
  //   type.barraks +'_7',
  // ],
  listBuildings: {
    hall: { name: type.hall, maxLvl: 3 },
    fort: { name: type.fort, maxLvl: 3 },
    tavern: { name: type.tavern, maxLvl: 1 },
    market: { name: type.market, maxLvl: 1 },
    storage: { name: type.storage, maxLvl: 10 },
    guild: { name: type.guild, maxLvl: 5 },
    barraks_1: { name: type.barraks + '_1', maxLvl: 2 },
    barraks_2: { name: type.barraks + '_2', maxLvl: 2 },
    barraks_3: { name: type.barraks + '_3', maxLvl: 2 },
    barraks_4: { name: type.barraks + '_4', maxLvl: 2 },
    barraks_5: { name: type.barraks + '_5', maxLvl: 2 },
    barraks_6: { name: type.barraks + '_6', maxLvl: 2 },
    barraks_7: { name: type.barraks + '_7', maxLvl: 2 }
  },
  form_IfBuilding: function(values) {
    const result = [];
    Object.keys(values).forEach(key => {
      const flag = Object.keys(Town.listBuildings).some(build => {
        const inst = Town.listBuildings[build];
        return inst.name === key;
      });
      if (flag) {
        const obj = {
          building: key,
          lvl: values[key]
        };
        result.push(obj);
      }
    });
    return result;
  }
};

module.exports = Town;
