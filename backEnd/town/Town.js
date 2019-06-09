const schema = require('../workWithMongoDB/schema');
const type = schema.document.class;
const Town = {
  classInstance: schema.document.class.town,
  baseBuilding: {
    parent: 'town',
    lvl: 0
  },
  listBuildings: [
    type.hall,
    type.fort,
    type.tavern,
    type.market,
    type.storage,
    type.quild,
    type.barraks +'_1',
    type.barraks +'_2',
    type.barraks +'_3',
    type.barraks +'_4',
    type.barraks +'_5',
    type.barraks +'_6',
    type.barraks +'_7',
  ],
  // listBuildings: {
  //   [type.hall]: {name: type.hall},
  //   [type.fort]: {name: type.fort},
  //   [type.tavern]: {name: type.tavern},
  //   [type.market]: {name: type.market},
  //   [type.storage]: {name: type.storage},
  //   [type.guild]: {name: type.guild},
  //   [type.barraks+'_1']: {name: type.barraks+'_1'},
  //   [type.barraks+'_2']: {name: type.barraks+'_2'},
  //   [type.barraks+'_3']: {name: type.barraks+'_3'},
  //   [type.barraks+'_4']: {name: type.barraks+'_4'},
  //   [type.barraks+'_5']: {name: type.barraks+'_5'},
  //   [type.barraks+'_6']: {name: type.barraks+'_6'},
  //   [type.barraks+'_7']: {name: type.barraks+'_7'},
  // }
};

module.exports = Town;
