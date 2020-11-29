const template = require('template_func');
const console = new template.Log(__filename);
const ZoneControl = require('../ZoneControl');

// TODO: остановлся над работой создания метода, который бы вел подсчет среднего значения влияния
function calculateMediumWeight(values) {
  const arr = Object.entries(values);
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[0][1];
  const result = [];
  const computedTime = ZoneControl.computedTime;
  arr.forEach((item, index) => {
    // if (index === 0) return;
    const weight = getWeightOnIndex(index, arr);
    const prevTime = arr[index - 1] !== undefined ? +arr[index - 1][0] : Date.now() - computedTime;
    const sizeTime = Math.abs(+item[0] - prevTime);
    const percentTime = (sizeTime / computedTime) * 100;
    const percentValue = (weight / 100) * percentTime;
    result.push(percentValue);
  });
  // значение почему-то увеличивается, но думаю, что это пофиксится, когда я стану удалять более поздние записи значений
  const resultValue = result.reduce((acc, a) => {
    return (acc += a);
  }, 0);
  return resultValue;
}

function getWeightOnIndex(targetIndex, arr) {
  let acc = 0;
  arr.some((item, index) => {
    let flag = false;
    if (index === targetIndex) {
      flag = true;
    }
    acc += item[1];
    return flag;
  });
  return acc;
}
module.exports = calculateMediumWeight;
