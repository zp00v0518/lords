const { Army } = require('../army');
const getForceStackWithHero = require('./getForceStackWithHero');

function calculateBattle(attackHero, aArmy, dArmy, defHero) {
  const attackArmy = JSON.parse(JSON.stringify(aArmy));
  const defArmy = JSON.parse(JSON.stringify(dArmy));
  defArmy.sort((a, b) => {
    return Army.getForceStack(b) - Army.getForceStack(a);
  });
  let attackIndex = 0;
  let attackStackForce = 0;
  const result = [];
  for (let i = 0; i < defArmy.length; i++) {
    const defStack = defArmy[i];
    let defStackForce = getForceStackWithHero(defStack);
    let atackStack = 1;
    atackStack = attackArmy[attackIndex];
    while (defStackForce > 0 && atackStack) {
      const step = {};
      attackStackForce = getForceStackWithHero(atackStack);
      const different = defStackForce - attackStackForce;
      attackStackForce = attackStackForce - defStackForce;
      defStackForce = different;
      if (attackStackForce <= 0) {
        attackIndex++;
        atackStack = attackArmy[attackIndex];
      }
      result.push(step);
    }
  }
  const a = attackArmy.filter(i => i.pow > 0);
  const b = defArmy.filter(i => i.pow > 0);
}

module.exports = calculateBattle;
