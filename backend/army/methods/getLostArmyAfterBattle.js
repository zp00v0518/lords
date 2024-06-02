const template = require('template_func');
const console = new template.Log(__filename);
const createStackItemTemplate = require('../baseArmy/createStackItemTemplate');

function getLostArmyAfterBattle(startArmy, lastArmy) {
  if (startArmy === lastArmy) {
    console.log('В метод переда одна и та же армия. Подсчитать данные невозможно');
  }
  const templateStack = createStackItemTemplate();
  const result = [];
  startArmy.forEach((startItem, index) => {
    const lastItem = lastArmy[index];
    if (!lastItem) return;
    const item = Object.assign(templateStack, startItem);
    item.count = startItem.count - lastItem.count;
    result.push(item);
  });
  return result;
}

module.exports = getLostArmyAfterBattle;
