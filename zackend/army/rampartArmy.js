const Army = require('./Army');
const l = Army.armyBuildings;
const types = Army.types;
const createUnit = require('./units/createUnit');

module.exports = {
  [l.barraks_1.name]: {
    type: l.barraks_1.name,
    lvl: {
      1: {
        param: createUnit({
          name: l.barraks_1.name,
          type: types.pex.name,
          attak: 5,
          defense: 5,
          hp: 10,
          cost: { gold: 100 }
        })
      },
      2: {
        param: createUnit({
          name: l.barraks_1.name,
          type: types.pex.name,
          attak: 10,
          defense: 10,
          hp: 15,
          cost: { gold: 120 }
        })
      }
    }
  }
};
