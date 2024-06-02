const Town = require('../../town/Town');
const town_list = Town.listBuildings;
const { hall, market, guild, storage, tavern, fort } = require('./buildings');

const rampart = {
  [town_list.hall.name]: hall,
  [town_list.market.name]: market,
  [town_list.guild.name]: guild,
  [town_list.storage.name]: storage,
  [town_list.tavern.name]: tavern,
  [town_list.fort.name]: fort,
  [town_list.barraks_1.name]: {
    lvl: {
      1: {
        ru: 'конюшня кентавров'
      },
      2: {
        ru: 'улучшенная конюшня кентавров'
      }
    }
  },
  [town_list.barraks_2.name]: {
    lvl: {
      1: {
        ru: 'гномы'
      },
      2: {
        ru: 'улучшенные гномы'
      }
    }
  },
  [town_list.barraks_3.name]: {
    lvl: {
      1: {
        ru: 'эльфы'
      },
      2: {
        ru: 'великие эльфы'
      }
    }
  },
  [town_list.barraks_4.name]: {
    lvl: {
      1: {
        ru: 'пегасы'
      },
      2: {
        ru: 'серебряные пегасы'
      }
    }
  },
  [town_list.barraks_5.name]: {
    lvl: {
      1: {
        ru: 'дендроиды'
      },
      2: {
        ru: 'улучшенные дендроиды'
      }
    }
  },
  [town_list.barraks_6.name]: {
    lvl: {
      1: {
        ru: 'единороги'
      },
      2: {
        ru: 'улучшенные единороги'
      }
    }
  },
  [town_list.barraks_7.name]: {
    lvl: {
      1: {
        ru: 'зеленые драконы'
      },
      2: {
        ru: 'золотые драконы'
      }
    }
  }
};

module.exports = rampart;
