import { Army } from '../../army/index.js';

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

export default getControlWeightFromArmy;
