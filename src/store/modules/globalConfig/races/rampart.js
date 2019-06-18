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
    },
    [listBuildings.tavern.name]: {
      lvl: {
        1: {
          imgInfo: {
            name: 'tavern',
            coords: { x: 180, y: 225 },
            zoom: 13
          }
        }
      }
    },
    [listBuildings.barraks_1.name]: {
      lvl: {
        1: {
          imgInfo: {
            name: 'barraks_1_1',
            coords: { x: 135, y: 300 },
            zoom: 12
          }
        },
        2: {
          imgInfo: {
            name: 'barraks_1_2',
            coords: { x: 135, y: 300 },
            zoom: 12
          }
        }
      }
    },
    [listBuildings.barraks_2.name]: {
      lvl: {
        1: {
          imgInfo: {
            name: 'barraks_2_1',
            coords: { x: 0, y: 150 },
            zoom: 10
          }
        },
        2: {
          imgInfo: {
            name: 'barraks_1_2',
            coords: { x: 0, y: 150 },
            zoom: 10
          }
        }
      }
    },
    [listBuildings.barraks_3.name]: {
      lvl: {
        1: {
          imgInfo: {
            name: 'barraks_3_1',
            coords: { x: 665, y: 95 },
            zoom: 6
          }
        },
        2: {
          imgInfo: {
            name: 'barraks_3_2',
            coords: { x: 665, y: 95 },
            zoom: 6
          }
        }
      }
    },
    [listBuildings.barraks_4.name]: {
      lvl: {
        1: {
          imgInfo: {
            name: 'barraks_4_1',
            coords: { x: 290, y: 25 },
            zoom: 4
          }
        },
        2: {
          imgInfo: {
            name: 'barraks_4_2',
            coords: { x: 290, y: 25 },
            zoom: 4
          }
        }
      }
    },
    [listBuildings.barraks_5.name]: {
      lvl: {
        1: {
          imgInfo: {
            name: 'barraks_5_1',
            coords: { x: 55, y: 150 },
            zoom: 11
          }
        },
        2: {
          imgInfo: {
            name: 'barraks_5_2',
            coords: { x: 55, y: 150 },
            zoom: 11
          }
        }
      }
    },
    [listBuildings.barraks_6.name]: {
      lvl: {
        1: {
          imgInfo: {
            name: 'barraks_6_1',
            coords: { x: 370, y: 90 },
            zoom: 3
          }
        },
        2: {
          imgInfo: {
            name: 'barraks_6_2',
            coords: { x: 370, y: 90 },
            zoom: 3
          }
        }
      }
    },
    [listBuildings.barraks_7.name]: {
      lvl: {
        1: {
          imgInfo: {
            name: 'barraks_7_1',
            coords: { x: 490, y: 0 },
            zoom: 2
          }
        },
        2: {
          imgInfo: {
            name: 'barraks_7_2',
            coords: { x: 490, y: 0 },
            zoom: 2
          }
        }
      }
    }
  }
};

export default rampart;
