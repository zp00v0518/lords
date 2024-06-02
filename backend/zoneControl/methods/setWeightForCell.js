const ZoneControl = require('../ZoneControl');
const step = ZoneControl.stepArea;

function setWeightForCell(value, arr) {
  const center = Math.floor(arr.length / 2);
  for (let i = 0; i < arr.length; i++) {
    const row = arr[i];
    for (let h = 0; h < row.length; h++) {
      const item = row[h];
      let radiusX = Math.abs(center - i);
      let radiusY = Math.abs(center - h);
      let weight = Math.max(radiusX, radiusY);
      weight = weight - 1 < 0 ? 0 : weight - 1;
      const maxValue = weight * step;
      let power = maxValue <= value ? value - maxValue : step - (maxValue - value);
      power = value - maxValue < 0 ? 0 : power;
      item.power = power;
      item.weight = weight;
    }
  }
}

module.exports = setWeightForCell;
