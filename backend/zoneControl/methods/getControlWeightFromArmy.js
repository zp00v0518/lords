const template = require('template_func');
const console = new template.Log(__filename);
const { Army } = require('../../army');

function getControlWeightFromArmy(army) {
  let result = 0;
  army.forEach(stack => {
    const { race, name, count } = stack;
    const baseUnit = Army.race[race][name];
    const { hp } = baseUnit;
    result += hp * count;
  });
  return result;
}

module.exports = getControlWeightFromArmy;
