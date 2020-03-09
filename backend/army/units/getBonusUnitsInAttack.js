const Bonus = require('./Bonus');

// бонус не может быть больше, чем сила противоположной армии
function getBonusUnitsInAttack(aForce, aType, dForce, dType) {
  let result = 0;
  if (Bonus[aType][dType]) {
    const bonus = Bonus[aType][dType];
    result = result + (aForce / 100 * bonus);
    result = result > dForce ? dForce : result;

  }
  if (Bonus[dType][aType]) {
    const bonus = Bonus[dType][aType];
    result = result - (dForce / 100 * bonus);
    result = Math.abs(result) > aForce ? -aForce : result;
  }
  return result;
}

module.exports = getBonusUnitsInAttack;
