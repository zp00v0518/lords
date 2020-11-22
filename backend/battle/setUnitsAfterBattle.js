const Battle = require('./Battle');

function setUnitsAfterBattle(battleResult, atArmy, defArmy) {
  const atackResult = battleResult.atackArmy;
  const { lostIndex } = Battle.units;
  const atackArmy = JSON.parse(JSON.stringify(atArmy));
  atackArmy.forEach(stack => {
    const startCount = stack.count;
    const rezultStack = atackResult.find(i => i.race === stack.race && i.name === stack.name);
    if (rezultStack) {
      const restCount = rezultStack.count;
      const lostCount = startCount - restCount;
      stack.count = Math.floor(stack.count - lostCount * lostIndex);
    }
  });
  return { atackArmy };
}

module.exports = setUnitsAfterBattle;
