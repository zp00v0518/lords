const { getRandomNumber } = require("template_func");

function createArmy({
  range_power_army = [2000, 3000],
  stackRange = [1, 7],
  units = [],
  random = true
}) {
  const stack_count = random
    ? getRandomNumber(stackRange[0], stackRange[1])
    : units.length;
  let power_army = random
    ? getRandomNumber(range_power_army[0], range_power_army[1])
    : range_power_army[0];
  const stack_units = getUnits({ stack_count, units });
  let result = {};
  if (stack_units.length > 1) {
    while (power_army > 0) {
      const i = getRandomNumber(stack_units.length - 1);
      const unit = stack_units[i];
      const { name, hp } = unit;
      if (!result[name]) {
        result[name] = createTemplate(unit);
      }
      result[name].count++;
      power_army -= hp;
    }
  } else {
    const { name, hp } = stack_units[0];
    result[name] = createTemplate(stack_units[0]);
    result[name].count = Math.floor(power_army / hp);
  }
  return Object.values(result);
}

function createTemplate(unit) {
  const { name, race, lvl } = unit;
  const template = {
    race,
    name,
    lvl,
    count: 0
  };
  return template;
}

function getUnits({ stack_count = 1, units = [] }) {
  const allUnits = units.slice();
  const result = [];
  for (let i = 0; i < stack_count; i++) {
    const num = getRandomNumber(allUnits.length - 1);
    const d = allUnits.splice(num, 1);
    result.push(d[0]);
  }
  return result;
}

module.exports = createArmy;
