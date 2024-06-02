function createArmyForBattle(attackArmy, heroArmy) {
  const result = [];
  const template = {
    is: false
  };
  const flag = attackArmy.every(a => {
    const d = heroArmy.find(x => a.name === x.name && a.race === x.race);
    if (!d) return false;
    result.push(d);
    return true;
  });
  if (flag) {
    template.army = JSON.parse(JSON.stringify(result));
    template.is = true;
  }
  return template;
}

module.exports = createArmyForBattle;
