const Army = require('./Army');

function getArmyRange(townIndex) {
  const basRange = Army.army_range.base;
  const coeff = Army.army_range.coeff * townIndex;
  const base = basRange[0] * coeff;
  const shift = (base / 100) * 15;
  return [base - shift, base + shift];
  // return basRange.map(i => i * coeff + i);
}

module.exports = getArmyRange;
