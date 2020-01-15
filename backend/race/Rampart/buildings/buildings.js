const Resources = require('../../../resources/Resources');
const formPrice = Resources.formPrice;
const Town = require('../../../town/Town');
const t = Town.listBuildings;
const form_IfBuilding = Town.form_IfBuilding;
const army_list = require('../../../army/units/rampart/list');

const buildings = {
    listBuildings: t,
    [t.market.name]: {
      type: t.market.name,
      lvl: {
        1: {
          is: true,
          prepare: false,
          if: [],
          price: formPrice({ gold: 2000, wood: 5, ore: 5 }),
          
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
          price: formPrice({ gold: 2000, wood: 5, ore: 5 }),
          maxValue: {
            //вместимость склада
            gold: 100000,
            baseResource: 18,
            unicResource: 10
          }
        },
        2: {
          is: false,
          prepare: false,
          if: form_IfBuilding({ [t.storage.name]: 1 }),
          price: formPrice({ gold: 4000, wood: 5, ore: 5 }),
          maxValue: {
            //вместимость склада
            gold: 150000,
            baseResource: 25,
            unicResource: 14
          }
        },
        3: {
          is: false,
          prepare: false,
          if: [{ building: t.storage.name, lvl: 2 }],
          price: formPrice({ gold: 8000, wood: 5, ore: 5 }),
          maxValue: {
            //вместимость склада
            gold: 200000,
            baseResource: 30,
            unicResource: 18
          }
        },
        4: {
          is: false,
          prepare: false,
          if: [{ building: t.storage.name, lvl: 3 }],
          price: formPrice({ gold: 16000, wood: 8, ore: 8 }),
          maxValue: {
            gold: 250000,
            baseResource: 45,
            unicResource: 24
          }
        },
        5: {
          is: false,
          prepare: false,
          if: [{ building: t.storage.name, lvl: 4 }],
          price: formPrice({
            gold: 32000,
            wood: 5,
            ore: 5,
            sulfur: 1,
            crystal: 1,
            mercury: 1,
            gem: 1
          }),
          maxValue: {
            gold: 300000,
            baseResource: 60,
            unicResource: 30
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
          price: formPrice({ gold: 5000, wood: 5, ore: 5 }),
          spellsValue: 5 //количество заклинаний}
        },
        2: {
          is: false,
          prepare: false,
          if: [{ building: t.guild.name, lvl: 1 }],
          price: formPrice({
            gold: 10000,
            wood: 5,
            ore: 5,
            sulfur: 4,
            crystal: 4,
            mercury: 4,
            gem: 4
          }),
          spellsValue: 4
        }, //количество заклинаний},
        3: {
          is: false,
          prepare: false,
          if: [{ building: t.guild.name, lvl: 2 }],
          price: formPrice({
            gold: 15000,
            wood: 5,
            ore: 5,
            sulfur: 6,
            crystal: 6,
            mercury: 6,
            gem: 6
          }),
          spellsValue: 3 //количество заклинаний
        },
        4: {
          is: false,
          prepare: false,
          if: [{ building: t.guild.name, lvl: 3 }],
          price: formPrice({
            gold: 20000,
            wood: 5,
            ore: 5,
            sulfur: 8,
            crystal: 8,
            mercury: 8,
            gem: 8
          }),
          spellsValue: 2
        }, //количество заклинаний},
        5: {
          is: true,
          prepare: false,
          if: [{ building: t.guild.name, lvl: 4 }],
          price: formPrice({
            gold: 25000,
            wood: 5,
            ore: 5,
            sulfur: 10,
            crystal: 10,
            mercury: 10,
            gem: 10
          }),
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
          price: formPrice({ gold: 10000, wood: 10, ore: 10 })
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
          price: formPrice({ gold: 5000, wood: 1, ore: 1 }),
          effect:{
            gold: 2000,
          }
        },
        2: {
          is: false,
          prepare: false,
          if: [{ building: t.hall.name, lvl: 1 }],
          price: formPrice({ gold: 10000, wood: 1, ore: 1 }),
          effect: {
            gold: 16000,
          }
        },
      }
    },
    [t.tavern.name]: {
      type: t.tavern.name,
      lvl: {
        1: {
          is: false,
          prepare: false,
          if: [],
          price: formPrice({ gold: 5000, wood: 5, ore: 5 })
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
          price: formPrice({ gold: 1000, wood: 1, ore: 1 }),
          effect:{
            addValue: 12
          },
          unit: {name:army_list.kentavr.name}
        },
        2: {
          is: false,
          prepare: false,
          if: [{ building: t.barraks_1.name, lvl: 1 }],
          price: formPrice({ gold: 1000, wood: 1, ore: 1 }),
          effect: {
            addValue: 12,
          },
          unit: {name:army_list.kentavr.name}
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
          price: formPrice({ gold: 1000, wood: 1, ore: 1 }),
          effect: {
            addValue: 10,
          },
          unit: {name: army_list.gnom.name}
        },
        2: {
          is: false,
          prepare: false,
          if: [{ building: t.barraks_2.name, lvl: 1 }],
          price: formPrice({ gold: 1000, wood: 1, ore: 1 }),
          effect: {
            addValue: 10,
          },
          unit: {name: army_list.gnom.name}
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
          price: formPrice({ gold: 1000, wood: 1, ore: 1 }),
          effect: {
            addValue: 8,
          },
          unit: {name: army_list.elf.name}
        },
        2: {
          is: false,
          prepare: false,
          if: [{ building: t.barraks_3.name, lvl: 1 }],
          price: formPrice({ gold: 1000, wood: 1, ore: 1 }),
          effect: {
            addValue: 8,
          },
          unit: {name: army_list.elf.name}
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
          price: formPrice({ gold: 1000, wood: 1, ore: 1, crystal: 1 }),
          effect: {
            addValue: 6,
          },
          unit:{name: army_list.pegas.name}
        },
        2: {
          is: false,
          prepare: false,
          if: [{ building: t.barraks_4.name, lvl: 1 }],
          price: formPrice({ gold: 1000, wood: 1, ore: 1 }),
          effect: {
            addValue: 6,
          },
          unit: {name:army_list.pegas.name}
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
          price: formPrice({ gold: 100, wood: 1, ore: 1, sulfur: 1 }),
          effect: {
            addValue: 4,
          },
          unit: {name:army_list.dendroid.name}
        },
        2: {
          is: false,
          prepare: false,
          if: [{ building: t.barraks_5.name, lvl: 1 }],
          price: formPrice({ gold: 1000, wood: 1, ore: 1 }),
          effect: {
            addValue: 4,
          },
          unit: {name: army_list.dendroid.name}
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
          price: formPrice({ gold: 1000, wood: 1, ore: 1, gem: 1 }),
          effect: {
            addValue: 2,
          },
          unit: {name: army_list.unicorn.name}
        },
        2: {
          is: false,
          prepare: false,
          if: [{ building: t.barraks_6.name, lvl: 1 }],
          price: formPrice({ gold: 1000, wood: 1, ore: 1 }),
          effect: {
            addValue: 2,
          },
          unit: {name: army_list.unicorn.name}
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
          price: formPrice({ gold: 1000, wood: 1, ore: 1, crystal: 1 }),
          effect: {
            addValue: 1,
          },
          unit: {name: army_list.green_dragon.name}
        },
        2: {
          is: false,
          prepare: false,
          if: [{ building: t.barraks_7.name, lvl: 1 }],
          price: formPrice({ gold: 1000, wood: 1, ore: 1 }),
          effect: {
            addValue: 1,
          },
          unit: {name: army_list.green_dragon.name}
        }
      }
    }
  }

module.exports = buildings;
