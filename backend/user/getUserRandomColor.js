import { getRandomNumber } from 'template_func';
import colors from '../config/color.js';

function getUserRandomColor() {
  const index = getRandomNumber(0, colors.length - 1);
  return colors[index];
}
export default getUserRandomColor;
