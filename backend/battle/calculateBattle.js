const { Army } = require('../army');
const getForceStackWithHero = require('./getForceStackWithHero');
const getBonusUnitsInAttack = require('../army/units/getBonusUnitsInAttack');
const { Heros } = require('../heroes');

function calculateBattle(attackHero, aArmy, dArmy, defHero) {
  const attackArmy = JSON.parse(JSON.stringify(aArmy));
  const defArmy = JSON.parse(JSON.stringify(dArmy));
  Army.sortDefenseArmy(defArmy);
  let attackIndex = 0;
  const result = [];
  const a_bonus = Heros.getHeroBonus(attackHero);
  const d_bonus = Heros.getHeroBonus(defHero);
  for (let i = 0; i < defArmy.length; i++) {
    const defStack = defArmy[i];
    const d_force_base = Army.getForceStack(defStack);
    let defStackForce = d_force_base + (d_force_base / 100) * d_bonus;
    let atackStack = attackArmy[attackIndex];
    while (defStackForce > 0 && atackStack) {
      const step = {
        attack: Object.assign({}, atackStack),
        def: Object.assign({}, defStack)
			};
			const a_force_base = Army.getForceStack(atackStack);
			let attackStackForce = a_force_base + (a_force_base / 100) * a_bonus;
			
      const aType = Army.getUnitInfo(atackStack.race, atackStack.name).type;
			const dType = Army.getUnitInfo(defStack.race, defStack.name).type;
			
      const bonus = getBonusUnitsInAttack(attackStackForce, aType, defStackForce, dType);
      const different = defStackForce - bonus - attackStackForce;
      attackStackForce = attackStackForce + bonus - defStackForce;
      defStackForce = different;
      if (attackStackForce <= 0) {
        attackIndex++;
        atackStack = attackArmy[attackIndex];
      }
      result.push(step);
    }
  }
}

module.exports = calculateBattle;
