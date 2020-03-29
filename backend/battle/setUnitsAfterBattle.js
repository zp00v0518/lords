const Battle = require('./Battle');

function setUnitsAfterBattle(battleResult, atackArmy, defArmy) {
  const atackResult = battleResult.atackArmy;
  const { lostIndex } = Battle.units;
  atackArmy.forEach(stack => {
    const startCount = stack.count;
    const rezultStack = atackResult.find(i => i.race === stack.race && i.name === stack.name);
    if (rezultStack) {
      const restCount = rezultStack.count;
      const lostCount = startCount - restCount;
      stack.count = Math.floor(stack.count - lostCount * lostIndex);
    }
  });
}

module.exports = setUnitsAfterBattle;
