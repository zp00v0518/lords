const schema = require('../workWithMongoDB/schema');
const type = schema.document.class;
const Town = {
  classInstance: schema.document.class.town,
  baseBuilding: {
    parent: 'town',
    lvl: 0
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
    hall: {name: type.hall},
      fort: {name: type.fort},
      tavern: {name: type.tavern},
      market: {name: type.market},
      storage: {name: type.storage},
      guild: {name: type.guild},
      barraks_1: {name: type.barraks+'_1'},
      barraks_2: {name: type.barraks+'_2'},
      barraks_3: {name: type.barraks+'_3'},
      barraks_4: {name: type.barraks+'_4'},
      barraks_5: {name: type.barraks+'_5'},
      barraks_6: {name: type.barraks+'_6'},
      barraks_7: {name: type.barraks+'_7'},
  }
};

module.exports = Town;
