const mineTypeList = require('../region/mine/Mine.js').typeList;

const Rampart = {
  mine: {
    default: [
      mineTypeList[0],
      mineTypeList[1],
      mineTypeList[2],
      mineTypeList[6]
    ]
  },
  buildings: {
    market: {
      is: true,
      prepare: false,
      if: [],
      price: {
        gold: 500,
        wood: 5
      },
      imgInfo: {
        name: 'rmarket.gif'
      }
    },
    storage1: {
      is: true,
      prepare: false,
      if: [],
      price: {
        gold: 1000,
        wood: 5,
        ore: 5
      },
      maxValue: {
        //вместимость склада
        gold: 150000,
        baseResource: 20,
        univResourc: 10
      },
      imgInfo: {
        name: 'rstorage.gif'
      }
    },
    storage2: {
      is: false,
      prepare: false,
      if: ['storage2'],
      price: {
        gold: 1000,
        wood: 5,
        ore: 5
      },
      maxValue: {
        //вместимость склада
        gold: 150000,
        baseResource: 20,
        univResourc: 10
      },
      imgInfo: {
        name: 'rstorage.gif'
      }
    },
    storage3: {
      is: false,
      prepare: false,
      if: ['storage2'],
      price: {
        gold: 1000,
        wood: 5,
        ore: 5
      },
      maxValue: {
        //вместимость склада
        gold: 150000,
        baseResource: 20,
        univResourc: 10
      },
      imgInfo: {
        name: 'rstorage.gif'
      }
    },
    storage4: {
      is: false,
      prepare: false,
      if: ['storage3'],
      price: {
        gold: 5000,
        wood: 8,
        ore: 8
      },
      maxValue: {
        gold: 100000,
        baseResource: 30,
        univResourc: 15
      },
      imgInfo: {
        name: 'rstorage.gif'
      }
    },
    storage5: {
      is: false,
      prepare: false,
      if: ['storage4'],
      price: {
        gold: 5000,
        wood: 5,
        ore: 5,
        gem: 1,
        sulfur: 1,
        crystal: 1,
        mercury: 1
      },
      maxValue: {
        gold: 100000,
        baseResource: 30,
        univResourc: 15
      },
      imgInfo: {
        name: 'rstorage.gif'
      }
    },

    mag1: {
      is: false,
      prepare: false,
      if: [],
      price: {
        gold: 5000,
        wood: 5,
        ore: 5
      },
      imgInfo: {
        name: 'rmag1.gif'
      },
      spellsValue: 5 //количество заклинаний
    },
    mag2: {
      is: false,
      prepare: false,
      if: ['mag1'],
      price: {
        gold: 5000,
        wood: 5,
        ore: 5,
        gem: 4,
        sulfur: 4,
        crystal: 4,
        mercury: 4
      },
      imgInfo: {
        name: 'rmag2.gif'
      },
      spellsValue: 4 //количество заклинаний
    },
    mag3: {
      is: false,
      prepare: false,
      if: ['mag2'],
      price: {
        gold: 5000,
        wood: 5,
        ore: 5,
        gem: 6,
        sulfur: 6,
        crystal: 6,
        mercury: 6
      },
      spellsValue: 3, //количество заклинаний
      imgInfo: {
        name: 'rmag3.gif'
      }
    },
    mag4: {
      is: false,
      prepare: false,
      if: ['mag3'],
      price: {
        gold: 5000,
        wood: 5,
        ore: 5,
        gem: 8,
        sulfur: 8,
        crystal: 8,
        mercury: 8
      },
      imgInfo: {
        name: 'rmag4.gif'
      },
      spellsValue: 2 //количество заклинаний
    },
    mag5: {
      is: true,
      prepare: false,
      if: ['mag4'],
      price: {
        gold: 5000,
        wood: 5,
        ore: 5,
        gem: 10,
        sulfur: 10,
        crystal: 10,
        mercury: 10
      },
      spellsValue: 1, //количество заклинаний
      imgInfo: {
        name: 'rmag5.gif'
      }
    },
    fort1: {
      is: false,
      prepare: false,
      if: [],
      price: {
        gold: 1000,
        wood: 5,
        ore: 5
      },
      imgInfo: {
        name: 'rfort1.gif'
      }
    },
    other1: {
      is: true,
      prepare: false,
      if: [],
      imgInfo: {
        name: 'rhou1.gif'
      }
    }
  }
};

module.exports = Rampart;
