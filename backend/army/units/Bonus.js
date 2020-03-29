const army_types = require('../Army/army_types');
const baseBonus = 25;

const Bonus = {
  baseBonus: 25,
  [army_types.arch]: {
    [army_types.pex]: baseBonus
  },
  [army_types.pex]: {
    [army_types.kon]: baseBonus
  },
  [army_types.kon]: {
    [army_types.arch]: baseBonus
  }
};

module.exports = Bonus;
