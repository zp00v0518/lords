const mineTypeList = require('../region/mine/Mine.js').typeList;
const { document } = require('../workWithMongoDB/schema');
const t = document.class;

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
    listBuildings: [t.tavern, t.storage, t.hall, t.fort, t.market, t.guild],
    [t.market]: {
      lvl: {
        0: {
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
        }
      }
    },
    [t.storage]: {
      lvl: {
        0: {
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
        1: {
          is: false,
          prepare: false,
          if: [{ buildig: t.storage, lvl: 0 }],
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
        2: {
          is: false,
          prepare: false,
          if: [{ buildig: t.storage, lvl: 1 }],
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
        3: {
          is: false,
          prepare: false,
          if: [{ buildig: t.storage, lvl: 2 }],
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
        4: {
          is: false,
          prepare: false,
          if: [{ buildig: t.storage, lvl: 3 }],
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
        }
      }
    },
    [t.guild]: {
      lvl: {
        0: {
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
          spellsValue: 5 //количество заклинаний}
        },
        1: {
          is: false,
          prepare: false,
          if: [{ buildig: t.guild, lvl: 0 }],
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
          spellsValue: 4
        }, //количество заклинаний},
        2: {
          is: false,
          prepare: false,
          if: [{ buildig: t.guild, lvl: 1 }],
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
        3: {
          is: false,
          prepare: false,
          if: [{ buildig: t.guild, lvl: 2 }],
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
          spellsValue: 2
        }, //количество заклинаний},
        4: {
          is: true,
          prepare: false,
          if: [{ buildig: t.guild, lvl: 3 }],
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
        }
      }
    },
    [t.fort]: {
      lvl: {
        0: {
          is: false,
          prepare: false,
          if: [{ buildig: t.guild, lvl: 0 }, { buildig: t.market, lvl: 0 }],
          price: {
            gold: 1000,
            wood: 5,
            ore: 5
          },
          imgInfo: {
            name: 'rfort1.gif'
          }
        }
      }
    }
  }
};

module.exports = Rampart;
