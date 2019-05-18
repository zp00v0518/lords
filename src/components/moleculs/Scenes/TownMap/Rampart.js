//файл создан для удобства разработки, временно
// потом его данные надо переместить в backEnd/race/Rampart

const Rampart = {
  buildings: {
    'market': {
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
            coords: { x: 0, y: 0} // в процентах
          }
        }
      }
    },
    'storage': {
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
            coords: { x: 20, y: 90} // в процентах
          }
        },
        1: {
          is: false,
          prepare: false,
          if: [{ buildig: 'storage', lvl: 0 }],
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
            coords: { x: 0, y: 0} // в процентах
          }
        },
        2: {
          is: false,
          prepare: false,
          if: [{ buildig: 'storage', lvl: 1 }],
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
            coords: { x: 0, y: 0}
          }
        },
        3: {
          is: false,
          prepare: false,
          if: [{ buildig: 'storage', lvl: 2 }],
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
            coords: { x: 0, y: 0}
          }
        },
        4: {
          is: false,
          prepare: false,
          if: [{ buildig: 'storage', lvl: 3 }],
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
            coords: { x: 0, y: 0}
          }
        }
      }
    },
    ['guild']: {
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
            coords: { x: 0, y: 0}
          },
          spellsValue: 5 //количество заклинаний}
        },
        1: {
          is: false,
          prepare: false,
          if: [{ buildig: 'guild', lvl: 0 }],
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
            coords: { x: 0, y: 0}
          },
          spellsValue: 4
        }, //количество заклинаний},
        2: {
          is: false,
          prepare: false,
          if: [{ buildig: 'guild', lvl: 1 }],
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
            coords: { x: 0, y: 0}
          }
        },
        3: {
          is: false,
          prepare: false,
          if: [{ buildig: 'guild', lvl: 2 }],
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
            coords: { x: 0, y: 0}
          },
          spellsValue: 2
        }, //количество заклинаний},
        4: {
          is: true,
          prepare: false,
          if: [{ buildig: 'guild', lvl: 3 }],
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
            coords: { x: 0, y: 0}
          }
        }
      }
    },
    fort: {
      lvl: {
        0: {
          is: false,
          prepare: false,
          if: [{ buildig: 'guild', lvl: 0 }, { buildig: 'market', lvl: 0 }],
          price: {
            gold: 1000,
            wood: 5,
            ore: 5
          },
          imgInfo: {
            name: 'fort_1',
            coords: { x: 0, y: 0}
          }
        }
      }
    },
    hall: {
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
            coords: { x: 60, y: 65}
          }
        },
        1: {
          is: false,
          prepare: false,
          if: [{ buildig: "hall", lvl: 0 }],
          price: {
            gold: 1000,
            wood: 5,
            ore: 5
          },
          imgInfo: {
            name: 'hall_2',
            coords: { x: 500, y: 400},// в процентах
          }
        }
      }
    }
  }
};

export default Rampart;
