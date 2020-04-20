const Army = require('./Army');

function getArmyRange(townIndex) {
  const basRange = Army.army_range.base;
  const coeff = Army.army_range.coeff * townIndex;
  return basRange.map(i => i * coeff + i);
}

module.exports = getArmyRange;
