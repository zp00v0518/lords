const { Army } = require('../army');
const getBonusUnitsInAttack = require('../army/units/getBonusUnitsInAttack');

// уточнить за defHero
function calculateBattle(atackHero, aArmy, dArmy, defHero) {
  const atackArmy = JSON.parse(JSON.stringify(aArmy));
  const defArmy = JSON.parse(JSON.stringify(dArmy));
  Army.sortDefenseArmy(defArmy);
  let defArmyCount = 0;
  const roundList = [];
  const battleResult = {
    roundList,
    atackArmy,
    defArmy
  }

  atackArmy.forEach(atackStack => {
    for (; atackStack.count > 0; ) {
      atackStack.force = Army.getForceStack(atackStack, { atackHero });
      const defStack = defArmy[defArmyCount];
      if (!defStack) break;
      defStack.force = Army.getForceStack(defStack, { defHero });
      const round = calculateRound(atackStack, defStack, atackHero, defHero);
      roundList.push(round);
      if (defStack.count <= 0) defArmyCount++;
    }
  });
  battleResult.atackWin = atackArmy[atackArmy.length -1].count > 0;
  return battleResult;
}
function calculateRound(atackStack, defStack, atackHero, defHero) {
  const atackUnitType = Army.getUnitInfo(atackStack.name, atackStack.race).type;
  const defUnitType = Army.getUnitInfo(defStack.name, defStack.race).type;
  const unitBonus = getBonusUnitsInAttack(atackStack.force, atackUnitType, defStack.force, defUnitType);

  let defLost = defStack.force - unitBonus - atackStack.force;
  defLost = defLost < 0 ? defStack.force : defStack.force - defLost;

  let atackLost = atackStack.force + unitBonus - defStack.force;
  atackLost = atackLost < 0 ? atackStack.force : atackStack.force - atackLost;

  defStack.lost = defLost;
  atackStack.lost = atackLost;
  const step = {
    atackStack: Object.assign({}, atackStack),
    defStack: Object.assign({}, defStack)
  };

  const atatckLostCount = setNewStackCount(atackStack, { atackHero });
  const defLostCount = setNewStackCount(defStack, { defHero });
  step.atackBonus = unitBonus;
  step.atackStack.lostCount = atatckLostCount;
  step.defStack.lostCount = defLostCount;
  // *******************
  // step.atackStack.unit = Army.getUnitInfo(atackStack.name, atackStack.race);
  // step.atackStack.unit.actualHp = Army.getActualUnitHP(atackStack, { atackHero });
  // step.defStack.unit = Army.getUnitInfo(defStack.name, defStack.race);
  // step.defStack.unit.actualHp = Army.getActualUnitHP(defStack, { defHero });
  return step;
}

function setNewStackCount(stack, ops = {}) {
  const hp = Army.getActualUnitHP(stack, ops);
  const lostCount = Math.floor(stack.lost / hp);
  const rezult = stack.count - lostCount;
  stack.count = rezult <= 0 ? 0 : rezult;
  return lostCount;
}

module.exports = calculateBattle;
