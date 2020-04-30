const { getRandomNumber } = require('template_func');
const colors = require('../config/color.json');

function getUserRandomColor() {
  const index = getRandomNumber(0, colors.length - 1);
  return colors[index];
}
module.exports = getUserRandomColor;
