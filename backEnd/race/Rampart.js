const mineTypeList = require('../region/mine/Mine.js').typeList;
const { document } = require('../workWithMongoDB/schema');
const t = require('../town/Town').listBuildings;
// const t = document.class;

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
    listBuildings: t,
    [t.market.name]: {
      type: t.market.name,
      lvl: {
        1: {
          is: true,
          prepare: false,
          if: [],
          price: {
            gold: 500,
            wood: 5
          }
        }
      }
    },
    [t.storage.name]: {
      type: t.storage.name,
      lvl: {
        1: {
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
          }
        },
        2: {
          is: false,
          prepare: false,
          if: [{ building: t.storage.name, lvl: 1 }],
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
          }
        },
        3: {
          is: false,
          prepare: false,
          if: [{ building: t.storage.name, lvl: 1 }],
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
          }
        },
        4: {
          is: false,
          prepare: false,
          if: [{ building: t.storage.name, lvl: 2 }],
          price: {
            gold: 5000,
            wood: 8,
            ore: 8
          },
          maxValue: {
            gold: 100000,
            baseResource: 30,
            univResourc: 15
          }
        },
        5: {
          is: false,
          prepare: false,
          if: [{ building: t.storage.name, lvl: 3 }],
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
          }
        }
      }
    },
    [t.guild.name]: {
      type: t.guild.name,
      lvl: {
        1: {
          is: false,
          prepare: false,
          if: [],
          price: {
            gold: 5000,
            wood: 5,
            ore: 5
          },
          spellsValue: 5 //количество заклинаний}
        },
        2: {
          is: false,
          prepare: false,
          if: [{ building: t.guild.name, lvl: 1 }],
          price: {
            gold: 5000,
            wood: 5,
            ore: 5,
            gem: 4,
            sulfur: 4,
            crystal: 4,
            mercury: 4
          },
          spellsValue: 4
        }, //количество заклинаний},
        3: {
          is: false,
          prepare: false,
          if: [{ building: t.guild.name, lvl: 1 }],
          price: {
            gold: 5000,
            wood: 5,
            ore: 5,
            gem: 6,
            sulfur: 6,
            crystal: 6,
            mercury: 6
          },
          spellsValue: 3 //количество заклинаний
        },
        4: {
          is: false,
          prepare: false,
          if: [{ building: t.guild.name, lvl: 2 }],
          price: {
            gold: 5000,
            wood: 5,
            ore: 5,
            gem: 8,
            sulfur: 8,
            crystal: 8,
            mercury: 8
          },
          spellsValue: 2
        }, //количество заклинаний},
        5: {
          is: true,
          prepare: false,
          if: [{ building: t.guild.name, lvl: 3 }],
          price: {
            gold: 5000,
            wood: 5,
            ore: 5,
            gem: 10,
            sulfur: 10,
            crystal: 10,
            mercury: 10
          },
          spellsValue: 1 //количество заклинаний
        }
      }
    },
    [t.fort.name]: {
      type: t.fort.name,
      lvl: {
        1: {
          is: false,
          prepare: false,
          if: [
            { building: t.guild.name, lvl: 1 },
            { building: t.market.name, lvl: 1 }
          ],
          price: {
            gold: 1000,
            wood: 5,
            ore: 5
          }
        }
      }
    },
    [t.hall.name]: {
      type: t.hall.name,
      lvl: {
        1: {
          is: true,
          prepare: false,
          if: [],
          price: {
            gold: 1000,
            wood: 5,
            ore: 5
          }
        },
        2: {
          is: false,
          prepare: false,
          if: [{ building: t.hall.name, lvl: 1 }],
          price: {
            gold: 1000,
            wood: 5,
            ore: 5
          }
        }
      }
    },
    [t.tavern.name]: {
      type: t.tavern.name,
      lvl: {
        1: {
          is: false,
          prepare: false,
          if: [],
          price: {
            gold: 1000,
            wood: 5,
            ore: 5
          }
        }
      }
    },
    [t.barraks_1.name]: {
      type: t.barraks_1.name,
      lvl: {
        1: {
          is: false,
          prepare: false,
          if: [],
          price: {
            gold: 1000,
            wood: 5,
            ore: 5
          }
        }
      }
    },
    [t.barraks_2.name]: {
      type: t.barraks_2.name,
      lvl: {
        1: {
          is: false,
          prepare: false,
          if: [],
          price: {
            gold: 1000,
            wood: 5,
            ore: 5
          }
        }
      }
    },
    [t.barraks_3.name]: {
      type: t.barraks_3.name,
      lvl: {
        1: {
          is: false,
          prepare: false,
          if: [],
          price: {
            gold: 1000,
            wood: 5,
            ore: 5
          }
        }
      }
    },
    [t.barraks_4.name]: {
      type: t.barraks_4.name,
      lvl: {
        1: {
          is: false,
          prepare: false,
          if: [],
          price: {
            gold: 1000,
            wood: 5,
            ore: 5
          }
        }
      }
    },
    [t.barraks_5.name]: {
      type: t.barraks_5.name,
      lvl: {
        1: {
          is: false,
          prepare: false,
          if: [],
          price: {
            gold: 1000,
            wood: 5,
            ore: 5
          }
        }
      }
    },
    [t.barraks_6.name]: {
      type: t.barraks_6.name,
      lvl: {
        1: {
          is: false,
          prepare: false,
          if: [],
          price: {
            gold: 1000,
            wood: 5,
            ore: 5
          }
        }
      }
    },
    [t.barraks_7.name]: {
      type: t.barraks_7.name,
      lvl: {
        1: {
          is: false,
          prepare: false,
          if: [],
          price: {
            gold: 1000,
            wood: 5,
            ore: 5
          }
        }
      }
    },
  }
};

module.exports = Rampart;

// const coords = {
// guild_5: { x: 380, y: 100, zoom: 10 },
// fort_3: { x: 60, y: 25, zoom: 0 },
// market: { x: 135, y: 300, zoom: 17 },
// storage: { x: 255, y: 325, zoom: 18 },
// tavern: { x: 180, y: 225, zoom: 13 },
// barraks_1_2: { x: 0, y: 235, zoom: 12 },
// barraks_2_2: { x: 0, y: 150, zoom: 10 },
// // rdwf2h: { x: 0, y: 150, zoom: 7 },
// barraks_3_2: { x: 665, y: 95, zoom: 6 },
// barraks_4_2: { x: 290, y: 25, zoom: 4 },
// barraks_5_2: { x: 55, y: 150, zoom: 11 },
// barraks_6_2: { x: 370, y: 90, zoom: 3 },
// barraks_7_2: { x: 490, y: 0, zoom: 2 },
// rgar2a: { x: 550, y: 295, zoom: 19 },
// rhou1: { x: 320, y: 235, zoom: 15, is_default: true },
// rhou2: { x: 290, y: 235, zoom: 14, is_default: true },
// rhou3: { x: 300, y: 190, zoom: 9, is_default: true },
// rhou4: { x: 250, y: 170, zoom: 8, is_default: true },
// raid: { x: 530, y: 100, zoom: 5 },
// hall_4: { x: 535, y: 180, zoom: 16 }
// };
