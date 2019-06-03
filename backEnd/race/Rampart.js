const mineTypeList = require('../region/mine/Mine.js').typeList;
const { document } = require('../workWithMongoDB/schema');
const t = document.class;

const default_img = [
  {
    is: true,
    prepare: false,
    if: [],
    imgInfo: {
      name: 'rhou1',
      coords: { x: 320, y: 235 },
      zoom: 15,
      is_default: true
    }
  },
  {
    is: true,
    prepare: false,
    if: [],
    imgInfo: {
      name: 'rhou2',
      coords: { x: 290, y: 235 },
      zoom: 14,
      is_default: true
    }
  },
  {
    is: true,
    prepare: false,
    if: [],
    imgInfo: {
      name: 'rhou3',
      coords: { x: 300, y: 190 },
      zoom: 9,
      is_default: true
    }
  },
  {
    is: true,
    prepare: false,
    if: [],
    imgInfo: {
      name: 'rhou4',
      coords: { x: 250, y: 170 },
      zoom: 8,
      is_default: true
    }
  }
];

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
    default_img: default_img,
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
            name: 'market',
            coords: { x: 135, y: 300 },
            zoom: 17
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
            name: 'storage',
            coords: { x: 255, y: 325 },
            zoom: 18
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
            name: 'storage',
            coords: { x: 255, y: 325 },
            zoom: 18
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
            name: 'storage',
            coords: { x: 255, y: 325 },
            zoom: 18
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
            name: 'storage',
            coords: { x: 255, y: 325 },
            zoom: 18
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
            name: 'storage',
            coords: { x: 255, y: 325 },
            zoom: 18
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
            name: 'guild_1',
            coords: { x: 380, y: 100 },
            zoom: 10
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
            name: 'guild_2',
            coords: { x: 380, y: 100 },
            zoom: 10
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
            name: 'guild_3',
            coords: { x: 380, y: 100 },
            zoom: 10
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
            name: 'guild_4',
            coords: { x: 380, y: 100 },
            zoom: 10
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
            name: 'guild_5',
            coords: { x: 380, y: 100 },
            zoom: 10
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
            name: 'fort_1',
            coords: { x: 60, y: 25 },
            zoom: 0
          }
        }
      }
    },
    [t.hall]: {
      lvl: {
        0: {
          is: false,
          prepare: false,
          if: [],
          price: {
            gold: 1000,
            wood: 5,
            ore: 5
          },
          imgInfo: {
            name: 'hall_1',
            coords: { x: 560, y: 215 },
            zoom: 16
          }
        },
        1: {
          is: false,
          prepare: false,
          if: [{ buildig: t.hall, lvl: 0 }],
          price: {
            gold: 1000,
            wood: 5,
            ore: 5
          },
          imgInfo: {
            name: 'hall_2',
            coords: { x: 535, y: 180 },
            zoom: 16
          }
        }
      }
    }
  }
};

module.exports = Rampart;


const coords = {
  guild_5: { x: 380, y: 100, zoom: 10},
  fort_3: { x: 60, y: 25, zoom: 0},
  market: { x: 135, y: 300, zoom: 17},
  storage: { x: 255, y: 325, zoom: 18},
  tavern: { x: 180, y: 225, zoom: 13},
  barraks_1_2: { x: 0, y: 235, zoom: 12},
  barraks_2_2: { x: 0, y: 150, zoom: 10},
  // rdwf2h: { x: 0, y: 150, zoom: 7 },
  barraks_3_2: { x: 665, y: 95, zoom: 6},
  barraks_4_2: { x: 290, y: 25, zoom: 4},
  barraks_5_2: { x: 55, y: 150, zoom: 11},
  barraks_6_2: { x: 370, y: 90, zoom: 3},
  barraks_7_2: { x: 490, y: 0, zoom: 2},
  rgar2a: { x: 550, y: 295, zoom: 19},
  rhou1: { x: 320, y: 235, zoom: 15, is_default: true},
  rhou2: { x: 290, y: 235, zoom: 14, is_default: true},
  rhou3: { x: 300, y: 190, zoom: 9, is_default: true},
  rhou4: { x: 250, y: 170, zoom: 8, is_default: true},
  raid: { x: 530, y: 100, zoom: 5},
  hall_4: { x: 535, y: 180, zoom: 16},
}