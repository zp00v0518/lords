import fromBackend from '../../../../fromBackend';
const listBuildings = fromBackend.Town.listBuildings;

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

const rampart = {
  buildings: {
    default_img: default_img,
    [listBuildings.market.name]: {
      lvl: {
        1: {
          imgInfo: {
            name: 'market',
            coords: { x: 135, y: 300 },
            zoom: 17
          }
        }
      }
    },
    [listBuildings.storage.name]: {
      lvl: {
        1: {
          imgInfo: {
            name: 'storage',
            coords: { x: 255, y: 325 },
            zoom: 18
          }
        },
        2: {
          imgInfo: {
            name: 'storage',
            coords: { x: 255, y: 325 },
            zoom: 18
          }
        },
        3: {
          imgInfo: {
            name: 'storage',
            coords: { x: 255, y: 325 },
            zoom: 18
          }
        },
        4: {
          imgInfo: {
            name: 'storage',
            coords: { x: 255, y: 325 },
            zoom: 18
          }
        },
        5: {
          imgInfo: {
            name: 'storage',
            coords: { x: 255, y: 325 },
            zoom: 18
          }
        }
      }
    },
    [listBuildings.guild.name]: {
      lvl: {
        1: {
          imgInfo: {
            name: 'guild_1',
            coords: { x: 380, y: 100 },
            zoom: 10
          }
        },
        2: {
          imgInfo: {
            name: 'guild_2',
            coords: { x: 380, y: 100 },
            zoom: 10
          }
        },
        3: {
          imgInfo: {
            name: 'guild_3',
            coords: { x: 380, y: 100 },
            zoom: 10
          }
        },
        4: {
          imgInfo: {
            name: 'guild_4',
            coords: { x: 380, y: 100 },
            zoom: 10
          }
        },
        5: {
          imgInfo: {
            name: 'guild_5',
            coords: { x: 380, y: 100 },
            zoom: 10
          }
        }
      }
    },
    [listBuildings.fort.name]: {
      lvl: {
        1: {
          imgInfo: {
            name: 'fort_1',
            coords: { x: 60, y: 25 },
            zoom: 0
          },
          tumb: { x: 900, y: 0 }
        }
      }
    },
    [listBuildings.hall.name]: {
      lvl: {
        1: {
          imgInfo: {
            name: 'hall_1',
            coords: { x: 560, y: 215 },
            zoom: 16
          },
          tumb: { x: 150, y: 70 }
        },
        2: {
          imgInfo: {
            name: 'hall_2',
            coords: { x: 535, y: 180 },
            zoom: 16
          },
          tumb: { x: 150, y: 70 }
        }
      }
    }
  }
};

export default rampart;
