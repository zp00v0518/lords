const { Army } = require('../army');
const getForceStackWithHero = require('./getForceStackWithHero');
const getBonusUnitsInAttack = require('../army/units/getBonusUnitsInAttack');
const { Heroes } = require('../heroes');

function calculateBattle(atackHero, aArmy, dArmy, defHero) {
  const atackArmy = JSON.parse(JSON.stringify(aArmy));
  const defArmy = JSON.parse(JSON.stringify(dArmy));
  Army.sortDefenseArmy(defArmy);
  let atackIndex = 0;
  const result = [];
  const a_bonus = Heroes.getHeroBonus(atackHero);
  const d_bonus = Heroes.getHeroBonus(defHero);
  for (let i = 0; i < defArmy.length; i++) {
    const d_stack = defArmy[i];
    const d_force_base = Army.getForceStack(d_stack);
    let d_stack_force = d_force_base + (d_force_base / 100) * d_bonus;
    let a_stack = atackArmy[atackIndex];
    while (d_stack_force > 0 && a_stack) {
      const step = {
        atack: Object.assign({}, a_stack),
        def: Object.assign({}, d_stack)
      };
      const a_force_base = Army.getForceStack(a_stack);
      let a_stack_force = a_force_base + (a_force_base / 100) * a_bonus;

      const aType = Army.getUnitInfo(a_stack.name, a_stack.race).type;
      const dType = Army.getUnitInfo(d_stack.name, d_stack.race).type;

      const unit_bonus = getBonusUnitsInAttack(a_stack_force, aType, d_stack_force, dType);
      let d_force_lost = d_stack_force - unit_bonus - a_stack_force;
      d_force_lost = d_force_lost < 0 ? d_stack_force : d_stack_force - d_force_lost;

			let a_force_lost = a_stack_force + unit_bonus - d_stack_force;
			a_force_lost = a_force_lost < 0 ? a_stack_force : a_stack_force - a_force_lost;
			console.log(a_force_lost)
      d_stack_force -= d_force_lost;
      a_stack_force -= a_force_lost;

      const a_count_lost = Army.getLostCountUnits(a_stack, a_bonus, a_force_lost);
      step.atack.lost = a_count_lost > step.atack.count ? step.atack.count : a_count_lost;
      step.atack.count -= step.atack.lost;
      a_stack.count = step.atack.count;

      if (a_stack_force <= 0) {
        atackIndex++;
        a_stack = atackArmy[atackIndex];
      }

      const d_count_lost = Army.getLostCountUnits(d_stack, d_bonus, d_force_lost);
      step.def.lost = d_count_lost > step.def.count ? step.def.count : d_count_lost;
      step.def.count -= step.def.lost;
      d_stack.count = step.def.count;
      result.push(step);
    }
  }
  console.log(result);
}

module.exports = calculateBattle;
